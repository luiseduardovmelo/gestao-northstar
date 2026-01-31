import pandas as pd

file_path = 'northstar/BANCO DE DADOS NORTH STAR.xlsx'
xls = pd.ExcelFile(file_path)

for sheet in xls.sheet_names:
    df = pd.read_excel(file_path, sheet_name=sheet, header=None)
    pages = []
    # The structure seems to have pages every 3 columns starting from column 4 (index 4)
    # Row 1 (index 1) has the names
    for i in range(4, df.shape[1], 3):
        val = df.iloc[1, i]
        if pd.notna(val) and str(val).strip() != '' and str(val).strip().upper() != 'PÁGINA':
            pages.append(str(val).strip())
    
    print(f"--- {sheet} ---")
    for page in pages:
        print(f"  - {page}")
    print("\n")
