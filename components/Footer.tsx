export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 text-center">
            <p>© {new Date().getFullYear()} Designed & Developed by <b><span className="text-blue-500"> <a
                href="https://www.linkedin.com/in/yadavshlok/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
            >
                SHLOK YADAV
            </a></span>. </b> All Rights Reserved.</p>
        </footer >
    );
}
