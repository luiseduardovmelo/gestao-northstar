import pandas as pd
import sys

file_path = 'northstar/BANCO DE DADOS NORTH STAR.xlsx'
try:
    xls = pd.ExcelFile(file_path)
    for sheet in xls.sheet_names:
        # Load first few rows to find page names in Row 1 (Index 1 or 0)
        df = pd.read_excel(file_path, sheet_name=sheet, header=None)
        
        # Based on user: "Na linha 1 a partir da coluna b vamos ter as páginas"
        # If Excel Row 1, that is df.iloc[0]. If User means Row 1 of data, could be df.iloc[1].
        # From previous summary, index 1 (df Row 2) had the names. Let's check both.
        
        pages = []
        # We start checking columns from index 1 (Column B)
        # We know pages are usually every 3 columns (Name, FixedValue, empty/etc)
        # But let's just pick anything in Row 1 (index 0) or Row 2 (index 1) that isn't empty/PÁGINA
        
        # Test Row 1 (df index 1) which previously had the names
        row_idx = 1
        for col_idx in range(1, df.shape[1]):
            val = df.iloc[row_idx, col_idx]
            if pd.notna(val) and str(val).strip() != '' and str(val).strip().upper() not in ['PÁGINA', 'URL', 'TRÁFEGO', 'FIXO/VALOR']:
                # The names are at indices 4, 7, 10... etc.
                # Let's filter to only those that don't look like URLs or "PÁGINA"
                if not str(val).startswith('http') and len(str(val).strip()) > 2:
                    if str(val).strip() not in pages:
                        pages.append(str(val).strip())
        
        print(f"[{sheet}]")
        for i, p in enumerate(pages, 1):
            print(f"{i}. {p}")
        print()

except Exception as e:
    print(f"Error: {e}")
