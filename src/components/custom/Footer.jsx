const Footer = () => {
  return (
    <footer className="pb-4 mt-7">
      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-t border-brand-custom-blue/20" />
        <div className="text-center py-2 text-sm">
          <p>
            Your trusted companion for trip planning, hotel finds, and
            discovering new places.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} TravelMate — Designed and built by{" "}
            <span className="font-semibold text-brand-custom-red/80">
              Sakina Ali
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
