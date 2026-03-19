import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isAuthenticated, profile, logout } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          FROSTLINE
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/shop" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> Orders</span>
            </Link>
          )}
          <Link to="/cart" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Hi, {profile?.name?.split(' ')[0] ?? 'User'}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-1.5 h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Shop</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2 flex items-center gap-2">
              Cart {totalItems > 0 && <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] text-destructive-foreground">{totalItems}</span>}
            </Link>
            {isAuthenticated && (
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Orders</Link>
            )}
            {isAuthenticated ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm font-medium py-2 text-left text-destructive">Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
