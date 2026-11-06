with open('src/data/news.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Line 208 length:", len(lines[207]))
# Look at characters around 4850
idx = 4855
start = max(0, idx - 100)
end = min(len(lines[207]), idx + 100)
print(lines[207][start:end])
