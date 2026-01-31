import pandas as pd
import json
import os

file_path = 'northstar/BANCO DE DADOS NORTH STAR.xlsx'
output_path = 'src/data/extracted_data.json'

if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    exit(1)

xls = pd.ExcelFile(file_path)

jornais = []
paginas = []
operadores = []

jornal_id_map = {
    'GAZETA DO POVO': '2',
    'LANCE': '6',
    'UM DOIS ESPORTES': '4',
    'TRIVELA': '1',
    'LAKERS BRASIL': '5',
    'TRIBUNA DO PARANÁ': '7',
    'PLACAR': '3'
}

# Slugs and colors for consistency
jornal_meta = {
    '1': {'slug': 'trivela', 'cor': '#006633', 'logo': '/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png'},
    '2': {'slug': 'gazeta-do-povo', 'cor': '#003763', 'logo': '/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png'},
    '3': {'slug': 'placar', 'cor': '#E8312D', 'logo': '/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png'},
    '4': {'slug': 'um-dois-esportes', 'cor': '#009739', 'logo': '/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png'},
    '5': {'slug': 'lakers-brasil', 'cor': '#552583', 'logo': '/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png'},
    '6': {'slug': 'lance', 'cor': '#1E1E1E', 'logo': '/lovable-uploads/lance-logo.png'}, # Placeholder
    '7': {'slug': 'tribuna-do-parana', 'cor': '#D92027', 'logo': '/lovable-uploads/tribuna-logo.png'} # Placeholder
}

pagina_id_counter = 1
operador_id_counter = 1

for sheet_name in xls.sheet_names:
    if sheet_name not in jornal_id_map:
        continue
    
    jornal_id = jornal_id_map[sheet_name]
    df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
    
    # Jornal object
    jornais.append({
        'id': jornal_id,
        'nome': sheet_name.title(),
        'slug': jornal_meta[jornal_id]['slug'],
        'corPrimaria': jornal_meta[jornal_id]['cor'],
        'logoUrl': jornal_meta[jornal_id]['logo'],
        'numeroPaginas': 0, # Will update after counting
        'numeroOperadores': 0, # Will update
        'receitaTotal': 0, # Will update
        'createdAt': '2024-05-15T11:20:00Z'
    })
    
    jornal_receita = 0
    jornal_operadores_count = 0
    jornal_paginas_count = 0

    # Iterate over páginas (every 3 columns starting from 4)
    for col_idx in range(4, df.shape[1], 3):
        pagina_name = df.iloc[1, col_idx]
        if pd.isna(pagina_name) or str(pagina_name).strip() == '':
            continue
        
        jornal_paginas_count += 1
        url = df.iloc[2, col_idx]
        trafego = df.iloc[3, col_idx]
        try:
            trafego = int(trafego) if not pd.isna(trafego) else 0
        except:
            trafego = 0
            
        pagina_id = str(pagina_id_counter)
        pagina_id_counter += 1
        
        current_pagina = {
            'id': pagina_id,
            'jornalId': jornal_id,
            'nome': str(pagina_name).strip(),
            'status': 'ativa',
            'numeroOperadores': 0,
            'trafego': trafego,
            'operadores': []
        }
        
        # Operators for this page (Rows 5 to 19)
        pagina_operadores_count = 0
        for row_idx in range(5, 20):
            if row_idx >= df.shape[0]:
                break
                
            brand_name = df.iloc[row_idx, col_idx]
            if pd.isna(brand_name) or str(brand_name).strip() == '' or str(brand_name).lower() == 'nan':
                # Empty slot
                current_pagina['operadores'].append({
                    'id': str(operador_id_counter),
                    'paginaId': pagina_id,
                    'nome': 'Vazio',
                    'status': 'livre',
                    'valor': 0,
                    'ordem': row_idx - 4
                })
                operador_id_counter += 1
                continue
                
            value = df.iloc[row_idx, col_idx + 1]
            try:
                value = float(value) if not pd.isna(value) else 0
            except:
                value = 0
                
            operador_id = str(operador_id_counter)
            operador_id_counter += 1
            
            pagina_operadores_count += 1
            jornal_operadores_count += 1
            jornal_receita += value
            
            current_pagina['operadores'].append({
                'id': operador_id,
                'paginaId': pagina_id,
                'nome': str(brand_name).strip(),
                'status': 'vendido',
                'valor': value,
                'ordem': row_idx - 4,
                'vendidoEm': '2024-05-15T11:20:00Z'
            })
            
        current_pagina['numeroOperadores'] = pagina_operadores_count
        paginas.append(current_pagina)

    # Update jornal counts
    for j in jornais:
        if j['id'] == jornal_id:
            j['numeroPaginas'] = jornal_paginas_count
            j['numeroOperadores'] = jornal_operadores_count
            j['receitaTotal'] = jornal_receita

# Save to JSON
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump({'jornais': jornais, 'paginas': paginas}, f, ensure_ascii=False, indent=2)

print(f"Extraction complete. {len(jornais)} jornais and {len(paginas)} paginas extracted.")
