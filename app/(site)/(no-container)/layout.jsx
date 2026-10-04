// This layout removes the container constraint for full-width pages
// The parent (site) layout already has Navbar, Separator, and Footer
export default function NoContainerLayout({ children }) {
  return <>{children}</>;
}
