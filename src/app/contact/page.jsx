export default function ContactsPage() {
    return (
        <div>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Contacts</h1>
                <p className="text-lg text-muted-foreground mb-4">
                    For inquiries, please contact us at:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Email: </li>
                    <li>Phone: </li>
                    <li>Address: </li>
                </ul>
            </div>
        </div>
);
}