import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isAuthenticated, profile, logout } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-white">
          FROSTLINE
        </Link>
        import { Button } from '@/components/ui/button';

        // Background types for different pages
        const getNavbarStyle = (pathname: string) => {
          // Dark background pages
          const darkBgPages = ['/', '/login', '/register', '/shop', '/product', '/cart', '/checkout', '/orders', '/404'];

          const isDarkBg = darkBgPages.some(page => pathname === page || pathname.startsWith(page));

          if (isDarkBg) {
            return {
              nav: 'bg-black/20 backdrop-blur-xl',
              text: 'text-white',
              textMuted: 'text-white/70',
              textHover: 'hover:text-white',
              border: 'border-white/10',
              mobileMenu: 'bg-black/40 backdrop-blur-lg'
            };
          } else {
            return {
              nav: 'bg-white/20 backdrop-blur-xl border border-black/10',
              text: 'text-black',
              textMuted: 'text-black/60',
              textHover: 'hover:text-black/80',
              border: 'border-black/10',
              mobileMenu: 'bg-white/40 backdrop-blur-lg border border-black/10'
            };
          }
        };

        export default function Navbar() {
          const { isAuthenticated, profile, logout } = useAuth();
          const { totalItems } = useCart();
          const [menuOpen, setMenuOpen] = useState(false);
          const location = useLocation();
          const navStyle = getNavbarStyle(location.pathname);

          return (
            <nav className={`sticky top-0 z-50 ${navStyle.nav}`}>
              <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link to="/" className={`font-heading text-xl font-bold tracking-tight ${navStyle.text}`}>
                  FROSTLINE
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-6 md:flex">
                  <Link to="/shop" className={`text-sm font-medium ${navStyle.textMuted} transition-colors ${navStyle.textHover}`}>
                    Shop
                  </Link>
                  {isAuthenticated && (
                    <Link to="/orders" className={`text-sm font-medium ${navStyle.textMuted} transition-colors ${navStyle.textHover}`}>
                      <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> Orders</span>
                    </Link>
                  )}
                  <Link to="/cart" className={`relative ${navStyle.textMuted} transition-colors ${navStyle.textHover}`}>
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${navStyle.text}`}>Hi, {profile?.name?.split(' ')[0] ?? 'User'}</span>
                      <Button variant="ghost" size="sm" onClick={logout} className={`${navStyle.textMuted} ${navStyle.textHover}`}>
                        <LogOut className="mr-1.5 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link to="/login">
                        <Button variant="ghost" size="sm" className={`${navStyle.textMuted} ${navStyle.textHover}`}>Login</Button>
                      </Link>
                      <Link to="/register">
                        <Button size="sm">Register</Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile toggle */}
                <button className={`md:hidden ${navStyle.text}`} onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

              {/* Mobile menu */}
              {menuOpen && (
                <div className={`border-t ${navStyle.border} ${navStyle.mobileMenu} px-4 pb-4 pt-2 md:hidden`}>
                  <div className="flex flex-col gap-3">
                    <Link to="/shop" onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 ${navStyle.textMuted}`}>Shop</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 flex items-center gap-2 ${navStyle.textMuted}`}>
                      Cart {totalItems > 0 && <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] text-destructive-foreground">{totalItems}</span>}
                    </Link>
                    {isAuthenticated && (
                      <Link to="/orders" onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 ${navStyle.textMuted}`}>Orders</Link>
                    )}
                    {isAuthenticated ? (
                      <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm font-medium py-2 text-left text-destructive">Logout</button>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 ${navStyle.textMuted}`}>Login</Link>
                        <Link to="/register" onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 ${navStyle.textMuted}`}>Register</Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </nav>
          );
        }
