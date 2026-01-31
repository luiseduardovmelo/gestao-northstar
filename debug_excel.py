import pandas as pd

file_path = 'northstar/BANCO DE DADOS NORTH STAR.xlsx'
xls = pd.ExcelFile(file_path)

with open('excel_rows_debug.txt', 'w', encoding='utf-8') as f:
    for sheet in xls.sheet_names:
        f.write(f"\n--- {sheet} ---\n")
        df = pd.read_excel(file_path, sheet_name=sheet, header=None, nrows=10)
        for i in range(10):
            if i < df.shape[0]:
                f.write(f"Row {i}: {df.iloc[i].tolist()}\n")
