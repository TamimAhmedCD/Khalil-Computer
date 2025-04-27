// app/(dashboard)/layout.jsx

export const metadata = {
    title: "Dashboard | Khalil Computer",
    description: "Admin and Student dashboard panel for Khalil Computer."
};

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-100 p-4">
                    {children}
                </div>
            </body>
        </html>
    );
}
