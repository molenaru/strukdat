function Footer() {
  return (
    <footer className="w-full py-6 mt-8 border-t border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} EduStruct. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;