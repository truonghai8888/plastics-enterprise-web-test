with open('scripts/generate_wall_designer.py', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('<style dangerouslySetInnerHTML')
idx2 = text.find('`}</style>', idx1)
print(text[idx1:idx1+1500])
