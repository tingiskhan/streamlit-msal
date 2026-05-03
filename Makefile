build-react:
	@echo "Building React frontend..."
	cd msal_login/frontend && \
	npm ci && \
	npm run build

build: build-react
	@echo "Building Python package..."
	python -m build

.PHONY: build-react build
