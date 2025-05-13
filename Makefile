build-react:
	@echo "Building React frontend..."
	cd msal_login/frontend && \
	npm install && \
	npm run build

package:
	@echo "Packaging msal-login..."
	tar -czf msal-login-${VERSION}.tar.gz ./setup.py ./pyproject.toml ./README.md ./msal_login/__init__.py ./msal_login/frontend/build/ ./MANIFEST.in