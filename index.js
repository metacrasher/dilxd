// API Routes
let totalRoutes = 0;

const apiFolder = path.join(__dirname, 'src', 'api');

if (!fs.existsSync(apiFolder)) {
    throw new Error('Folder src/api tidak ditemukan!');
}

fs.readdirSync(apiFolder).forEach((subfolder) => {
    const subfolderPath = path.join(apiFolder, subfolder);

    if (!fs.statSync(subfolderPath).isDirectory()) {
        return;
    }

    fs.readdirSync(subfolderPath).forEach((file) => {
        const filePath = path.join(subfolderPath, file);

        if (path.extname(file) === '.js') {
            const route = require(filePath);

            if (typeof route !== 'function') {
                throw new Error(
                    `Route ${file} harus mengekspor function!`
                );
            }

            route(app);
            totalRoutes++;

            console.log(
                chalk.bgHex('#FFFF99').hex('#333').bold(
                    ` Loaded Route: ${path.basename(file)} `
                )
            );
        }
    });
});

console.log(
    chalk.bgHex('#90EE90').hex('#333').bold(' Load Complete! ✓ ')
);

console.log(
    chalk.bgHex('#90EE90').hex('#333').bold(
        ` Total Routes Loaded: ${totalRoutes} `
    )
);
