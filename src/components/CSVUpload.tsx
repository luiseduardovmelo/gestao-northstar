import React, { useState } from 'react';
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { parseExcelData } from '@/utils/excelParser';
import { useData } from '@/context/DataContext';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext provides useAuth

const CSVUpload = () => {
    const { session, user } = useAuth();
    const { refreshData, isLoading } = useData();
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file: File) => {
        const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
        const isCsv = file.type === "text/csv" || file.name.endsWith('.csv');

        if (!isExcel && !isCsv) {
            toast.error("Por favor, selecione um arquivo Excel (.xlsx) ou CSV.");
            return;
        }
        setFile(file);
        toast.success(`Arquivo ${file.name} selecionado!`);
    };

    const removeFile = () => {
        setFile(null);
    };

    const onUpload = async () => {
        if (!file) {
            toast.error("Selecione um arquivo primeiro.");
            return;
        }

        setUploading(true);
        console.log("[UPLOAD] Iniciando processamento do arquivo:", file.name);
        try {
            const data = await parseExcelData(file);
            console.log("Dados extraídos do Excel:", data);

            if (data.paginas.length === 0) {
                toast.error("Nenhum dado encontrado no arquivo. Verifique se as abas e colunas seguem o padrão.");
                setUploading(false);
                return;
            }

            const totalOps = data.paginas.reduce((acc, p) => acc + p.operadores.length, 0);
            toast.info(`Arquivo processado: ${data.paginas.length} páginas e ${totalOps} operadoras identificadas.`);

            // Tenta salvar no Supabase (opcional - nao bloqueia se falhar)
            try {
                const now = new Date();
                const snapshotDate = now.toISOString().split('T')[0];
                const timestamp = now.getTime();

                // Não incluir uploaded_by para evitar violação de foreign key
                const { data: uploadData, error: uploadError } = await supabase
                    .from('csv_uploads')
                    .insert([{
                        original_filename: `${file.name}_${timestamp}`,
                        upload_date: snapshotDate
                    }])
                    .select();

                console.log('[UPLOAD] Resultado do insert em csv_uploads:', { uploadData, uploadError });

                if (uploadError) {
                    console.error('[UPLOAD] Erro detalhado ao inserir em csv_uploads:', uploadError);
                    console.error('[UPLOAD] Código do erro:', uploadError.code);
                    console.error('[UPLOAD] Mensagem:', uploadError.message);
                    console.error('[UPLOAD] Detalhes:', uploadError.details);
                }

                if (!uploadError && uploadData?.[0]?.id) {
                    const uploadId = uploadData[0].id;
                    console.log('[UPLOAD] Upload ID criado:', uploadId);

                    // Salva dados brutos
                    const { error: rawDataError } = await supabase.from('csv_raw_data').insert([{
                        upload_id: uploadId,
                        row_data: { jornais: data.jornais, paginas: data.paginas }
                    }]);

                    if (rawDataError) {
                        console.error('[UPLOAD] Erro ao salvar csv_raw_data:', rawDataError);
                    } else {
                        console.log('[UPLOAD] csv_raw_data salvo com sucesso');
                    }

                    // Salva snapshot para BI
                    const snapshotRows = data.paginas.flatMap(pagina => {
                        const journal = data.jornais.find(j => j.id === pagina.jornalId);
                        return pagina.operadores.map(op => ({
                            upload_id: uploadId,
                            snapshot_date: snapshotDate,
                            journal_name: journal?.nome || 'Unknown',
                            page_name: pagina.nome,
                            operator_name: op.nome,
                            position: op.ordem,
                            price: op.valor,
                            traffic: pagina.trafego
                        }));
                    });

                    if (snapshotRows.length > 0) {
                        await supabase.from('bi_operator_snapshots').insert(snapshotRows);
                    }
                    console.log('[UPLOAD] Dados salvos no Supabase com sucesso');
                }
            } catch (dbError) {
                console.warn('[UPLOAD] Erro ao salvar no Supabase (ignorado):', dbError);
            }

            // Atualiza estado local (sempre funciona)
            const totalRevenue = data.jornais.reduce((acc, j) => acc + j.receitaTotal, 0);
            console.log(`[UPLOAD] Finalizado. Receita Total processada no arquivo: R$ ${totalRevenue}`);
            console.log('[UPLOAD] Chamando refreshData com', data.jornais.length, 'jornais e', data.paginas.length, 'páginas');
            console.log('[UPLOAD] Páginas do Um Dois Esportes:', data.paginas.filter(p => p.jornalId === '3').length);

            refreshData(data.jornais, data.paginas);
            toast.success(`Sucesso! Banco de dados atualizado.`);
            setFile(null);
        } catch (error: any) {
            console.error("Erro detalhado no processo de upload:", error);
            toast.error("Erro no Upload: " + (error.message || "Verifique o console (F12)"));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`
          relative rounded-xl border-2 border-dashed transition-all duration-300 p-8
          ${dragActive
                        ? 'border-indigo-500 bg-indigo-50/50'
                        : 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-gray-50/50'
                    }
          ${file ? 'border-green-500 bg-green-50/30' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {!file && (
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept=".csv, .xlsx, .xls"
                    />
                )}

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    {!file ? (
                        <>
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <Upload size={32} />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">Upload de Banco de Dados</p>
                                <p className="text-gray-500 mt-1">
                                    Arraste seu arquivo CSV aqui ou clique para selecionar
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">CSV ou Excel</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">Max 10MB</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 relative">
                                <FileSpreadsheet size={32} />
                                <button
                                    onClick={(e) => { e.preventDefault(); removeFile(); }}
                                    className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">{file.name}</p>
                                <p className="text-gray-500 mt-1">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            <Button
                                onClick={onUpload}
                                disabled={uploading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px]"
                            >
                                {uploading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processando...
                                    </span>
                                ) : (
                                    "Confirmar Upload"
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CSVUpload;
