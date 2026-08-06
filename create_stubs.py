import os

templates = {
    'appointments/appointment_list.html': '<ul>{% for appt in appointments %}<li>{{ appt }}</li>{% empty %}<li>No appointments.</li>{% endfor %}</ul>',
    'communication/notification_list.html': '<ul>{% for notif in notifications %}<li>{{ notif }}</li>{% empty %}<li>No notifications.</li>{% endfor %}</ul>',
    'billing/wallet.html': '<div><p>Balance: $0.00</p></div>',
    'communication/conversation_list.html': '<ul>{% for conv in conversations %}<li>{{ conv }}</li>{% empty %}<li>No messages.</li>{% endfor %}</ul>',
}

base_dir = 'templates'
for path, content in templates.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w') as f:
        f.write(content)
    print(f"Created {full_path}")
