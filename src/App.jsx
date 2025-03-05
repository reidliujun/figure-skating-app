import { AuthProvider } from './context/AuthContext';
import { CompletionProvider } from './context/CompletionContext';

function App() {
  return (
    <AuthProvider>
      <CompletionProvider>
        {/* rest of your app */}
      </CompletionProvider>
    </AuthProvider>
  );
}