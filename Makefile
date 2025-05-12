build-react:
	@echo "Building React frontend..."
	cd msal_login/frontend && \
	npm install && \
	npm run build

package:
	@echo "Packaging msal-login..."
	version=$(shell python3 -c "import msal_login; print(msal_login.__version__)") && \
	tar -czf msal-login-$$version.tar.gz ./setup.py ./pyproject.toml ./README.md ./msal_login/__init__.py ./msal_login/frontend/build/