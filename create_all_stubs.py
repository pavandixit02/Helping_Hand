import os
import glob
import re

base_dir = 'templates'
views_files = glob.glob('apps/*/views.py')
template_pattern = re.compile(r'template_name\s*=\s*["\']([^"\']+)["\']')

created_count = 0
for view_file in views_files:
    with open(view_file, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = template_pattern.findall(content)
        for template_path in matches:
            full_path = os.path.join(base_dir, template_path)
            if not os.path.exists(full_path):
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                with open(full_path, 'w', encoding='utf-8') as tf:
                    tf.write(f'<!-- Stub for {template_path} -->\n<h1>{template_path}</h1>\n<p>This is a stub.</p>')
                created_count += 1
                print(f"Created {full_path}")

print(f"Created {created_count} templates.")
