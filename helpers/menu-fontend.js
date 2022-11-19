const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/dashboard/main' },
                { title: 'ProgressBar', url: '/dashboard/progress' },
                { title: 'Graficas', url: '/dashboard/grafica1' },
            ]
        },
    ]

    if (role === 'ADMIN_ROLE') {

        menu.push({
            title: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                { title: 'Usuarios', url: '/dashboard/users' },
                { title: 'Hospitales', url: '/dashboard/hospitals' },
                { title: 'Medicos', url: '/dashboard/medics' },
            ]
        })

    }

    return menu;

}

module.exports = {
    getMenuFrontEnd
}