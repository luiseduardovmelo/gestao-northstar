
import os
import json

# Lista EXATA solicitada pelo usuário
data = """
1. GAZETA DO POVO

PLATAFORMA BÔNUS DE CADASTRO
PLATAFORMA QUE MAIS PAGA
BÔNUS SEM DEP CASSINO
FORTUNE TIGER
PLATAFORMAS LEGALIZADAS
MELHORES CASAS DE APOSTAS
PLATAFORMAS DE 10 CENTAVOS
CASSINOS LEGALIZADOS
CASSINOS ONLINE
MELHORES GRUPOS DE TELEGRAM
PLATAFORMA NOVA PAGANDO
PLATAFORMA DE 5 REAIS

2. LANCE

CASSINOS COM GIROS GRÁTIS
NOVOS CASSINOS ONLINE
PLATAFORMA DE 5 REAIS
PLATAFORMA NOVA
SITES DE APOSTAS
TOP 20 CASAS
BETS AUTORIZADAS
PLATAFORMA COM BÔNUS
PLATAFORMA QUE MAIS PAGA
COPA DO MUNDO 2026
BRASILEIRÃO 2026
AVIATOR

3. UM DOIS ESPORTES

CASSINOS COM BÔNUS SEM DEPÓSITO
CASSINOS COM RODADAS GRÁTIS
PLATAFORMAS QUE MAIS PAGAM
PLATAFORMAS DO JOGO DO TIGRINHO
CASSINOS QUE PAGAM VIA PIX
CASAS DE APOSTAS LEGALIZADAS NO BRASIL
PLATAFORMA DE 3 REAIS
NOVOS CASSINOS ONLINE
CASSINOS LEGALIZADOS NO BRASIL
CASSINOS COM DEPÓSITO MÍNIMO DE 1 REAL
SLOTS DE 10 CENTAVOS
SLOTS COM MAIOR RTP

4. TRIVELA

PLATAFORMA QUE MAIS PAGA
CASAS DE APOSTAS
PAGAMENTO ANTECIPADO
CASAS DE APOSTAS LEGALIZADAS
PLATAFORMA DE 3 REAIS
PLATAFORMA NOVA
NOVAS CASAS DE APOSTAS
CASAS DE APOSTAS PARA ESCANTEIOS
CASAS DE APOSTAS COM CASHBACK

5. LAKERS BRASIL

CASAS DE APOSTAS

6. TRIBUNA DO PARANÁ

PLATAFORMA NOVA

7. PLACAR

BETS QUE MAIS PAGAM
PLATAFORMAS COM BÔNUS NO BRASIL
CASSINOS ONLINE
SITES FORTUNE TIGER
CASSINO DEPÓSITO MÍNIMO 1 REAL
CASA DE APOSTA DEPÓSITO MÍNIMO 1 REAL
MELHORES CASAS DE APOSTAS
SITES PARA INICIANTES
NOVAS CASAS DE APOSTAS
"""

def generate_mock_data():
    jornais = []
    paginas = []
    
    current_jornal = None
    lines = data.strip().split('\n')
    
    jornal_id_counter = 1
    pagina_id_counter = 1
    
    # Metadados com IDs FIXOS para sincronizar com o parser
    metadata = {
        'GAZETA DO POVO': {'id': '1', 'slug': 'gazeta-do-povo', 'cor': '#003763', 'logo': '/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png'},
        'LANCE': {'id': '2', 'slug': 'lance', 'cor': '#1E1E1E', 'logo': '/lovable-uploads/lance.webp'},
        'UM DOIS ESPORTES': {'id': '3', 'slug': 'um-dois-esportes', 'cor': '#009739', 'logo': '/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png'},
        'TRIVELA': {'id': '4', 'slug': 'trivela', 'cor': '#006633', 'logo': '/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png'},
        'LAKERS BRASIL': {'id': '5', 'slug': 'lakers-brasil', 'cor': '#552583', 'logo': '/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png'},
        'TRIBUNA DO PARANÁ': {'id': '6', 'slug': 'tribuna-do-parana', 'cor': '#D92027', 'logo': '/lovable-uploads/tribuna.jpg'},
        'PLACAR': {'id': '7', 'slug': 'placar', 'cor': '#E8312D', 'logo': '/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png'}
    }

    for line in lines:
        line = line.strip()
        if not line: continue
        
        if line[0].isdigit() and '. ' in line:
            name = line.split('. ', 1)[1].upper()
            j_meta = metadata.get(name, {})
            jornais.append({
                'id': j_meta.get('id', str(jornal_id_counter)),
                'nome': name.title() if name != 'UM DOIS ESPORTES' else 'Um Dois Esportes',
                'slug': j_meta.get('slug', name.lower().replace(' ', '-')),
                'corPrimaria': j_meta.get('cor', '#000000'),
                'logoUrl': j_meta.get('logo', ''),
                'numeroPaginas': 0,
                'numeroOperadores': 0,
                'receitaTotal': 0,
                'createdAt': '2024-03-20T10:00:00Z'
            })
            current_jornal = jornais[-1]
            jornal_id_counter += 1
        elif current_jornal:
            p_id = str(pagina_id_counter)
            paginas.append({
                'id': p_id,
                'jornalId': current_jornal['id'],
                'nome': line,
                'status': 'ativa',
                'numeroOperadores': 0,
                'trafego': 0,
                'operadores': []
            })
            current_jornal['numeroPaginas'] += 1
            pagina_id_counter += 1

    # Formatar arquivo TS
    content = 'import { Jornal, Pagina, Operador } from "../types";\n\n'
    content += f'export const mockJornais: Jornal[] = {json.dumps(jornais, indent=2)};\n\n'
    content += f'export const mockPaginas: Pagina[] = {json.dumps(paginas, indent=2)};\n\n'
    content += 'export const operadoresDisponiveis: Operador[] = [];\n'
    content += 'export const mockOperadores: Operador[] = [];\n'

    with open('src/data/mockData.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Sucesso: mockData.ts atualizado com as 12 páginas da Gazeta.")

if __name__ == "__main__":
    generate_mock_data()
