with open('scripts/test_mock_browser.cjs', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
    "console.log('✓ v3Bang innerHTML rendered length:', (elements['v3Bang']?.innerHTML || '').length);",
    "console.log('✓ v3Bang children count:', elements['v3Bang']?.children?.length); console.log('✓ v3Bang child tagNames:', elements['v3Bang']?.children?.map(c => c.id || c.tagName));"
)

with open('scripts/test_mock_browser_2.cjs', 'w', encoding='utf-8') as f:
    f.write(code)
