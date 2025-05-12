package:
	@echo "Packaging msal-login..."
	version=$(shell python3 -c "import msal_login; print(msal_login.__version__)") && \
	tar -czf msal-login-$$version.tar.gz ./setup.py ./pyproject.toml ./README.md ./msal_login/__init__.py ./msal_login/frontend/build/