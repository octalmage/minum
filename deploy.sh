#/bin/bash
gren release -d -u octalmage -r minum -D prs --override
npm run build -- -p onTagOrDraft
