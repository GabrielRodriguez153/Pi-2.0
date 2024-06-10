const translations = {
    en: {
        menuLanguage: 'Language:',
        menuLangEnglish: 'English',
        menuLangPortuguese: 'Portuguese',
        txtFavorites: 'Favorites',
        txtRecently: 'Recently Viewed',
        txtMap: 'Map',
        btnLogin: 'Login',
        mainText: 'Discover the perfect view for your next getaway',
        subText: `“Sight Inn, where every trip turns into a unique experience”`,
        txtLocation: 'Where to?',
        txtCheckin: 'Check in',
        txtCheckout: 'Check out',
        txtRooms: 'Rooms & Guests',
        txtPrice: 'Price Range',
        txtRating: 'Rating',
        txtType: 'Type',
        txtLocal: 'Location',
        removeFilters: 'Remove Filters',
        txtSuggest: 'Suggestions',
        txtRecentlyStays: 'Recent Stays',
        txtFavoritesStays: 'Preferred Stays',
        txtOption: 'Choose from 1400 hotel options',
        txtHotelName: 'Sunset Beach Hotel',
        txtHotelDesc: 'Hotel Description',
        txtAdr: 'Address',
        txtHotelDescPar: 'Check out the Oceanfront Paradise Hotel in Miami Beach, where beachside luxury meets modern comfort.',
        txtHotelDescPar2: 'Soak in amazing ocean views, stay in stylish rooms, and enjoy easy access to all the fun in South Beach.',
        txtHotelAmen: 'Hotel Amenities',
        txtHotelAllAmen: 'Show all Amenities',
        txtHotelPrice: 'R$ 500 night',
        txtPriceNight: 'R$ 500 x 3 nights',
        txtPricenoTax: 'R$ 1500',
        txtPriceTax: 'Total before taxes',
        txtPriceIncludeTax: 'R$ 1500',
        txtOverview: 'Overview',
        txtOverviewGuest: 'Guest Overall Rating',
        txtcleanrating: 'Cleanliness',
        txtlocalrating: 'Location',
        txtvaluerating: 'Value for Money',
        txtcommurating: 'Communication',
        footerText: 'All Rights Reserved ®',
    },
    
    pt: {
        menuLanguage: 'Language:',
        menuLangEnglish: 'English',
        menuLangPortuguese: 'Portuguese',
        txtFavorites: 'Favoritos',
        txtRecently: 'Vistos Recentemente',
        txtMap: 'Mapa',
        btnLogin: 'Entrar',
        mainText: 'Encontre a vista perfeita para a sua próxima escapada',
        subText: `“Sight Inn, onde cada viagem se transforma em <br> uma experiência única.”`,
        txtLocation: 'Onde vamos?',
        txtCheckin: 'Check-in',
        txtCheckout: 'Check-out',
        txtRooms: 'Quartos & Hóspedes',
        txtPrice: 'Faixa de Preço',
        txtRating: 'Avaliação',
        txtType: 'Tipo',
        txtLocal: 'Localidade',
        removeFilters: 'Remover Filtros',
        txtSuggest: 'Sugestões',
        txtRecentlyStays: 'Hospedagens Recentes',
        txtFavoritesStays: 'Hospedagens Preferidas',
        txtOption: 'Escolha entre 1400 opções de hotéis',
        txtHotelName: 'Sunset Beach Hotel',
        txtHotelDesc: 'Descrição do Hotel',
        txtAdr: 'Endereço',
        txtHotelDescPar: 'Descubra o Oceanfront Paradise Hotel em Miami Beach, onde luxo à beira-mar e comodidades modernas se encontram.',
        txtHotelDescPar2: 'Desfrute de vistas deslumbrantes do oceano, acomodações elegantes e acesso conveniente às atrações de South Beach.',
        txtHotelAmen: 'Comodidades do Hotel',
        txtHotelAllAmen: 'Mostrar todas as comodidades',
        txtHotelPrice: 'R$ 500 diária',
        txtPriceNight: 'R$ 500 x 3 noites',
        txtPricenoTax: 'R$ 1500',
        txtPriceTax: 'Valor total sem impostos',
        txtPriceIncludeTax: 'R$ 1500',
        txtOverview: 'Visão geral',
        txtOverviewGuest: 'Avaliação geral dos hóspedes',
        txtcleanrating: 'Limpeza',
        txtlocalrating: 'Localização',
        txtvaluerating: 'Custo Benefício',
        txtcommurating: 'Comunicação',
        footerText: 'Todos os direitos reservados ®',
    }
};

document.querySelector('#menuLangEnglish').addEventListener('click', () => changeLang('en'));
document.querySelector('#menuLangEnglish').style.color = '#F5a223'
document.querySelector('#menuLangPortuguese').addEventListener('click', () => changeLang('pt'));

function changeLang(lang) {
    if (lang == 'en') {
        document.querySelector('#menuLangEnglish').style.color = '#F5a223'
        document.querySelector('#menuLangPortuguese').style.color = '#f1f1f1'
    }
    if (lang == 'pt') {
        document.querySelector('#menuLangPortuguese').style.color = '#F5a223'
        document.querySelector('#menuLangEnglish').style.color = '#f1f1f1'
    }
    const translation = translations[lang];
    document.querySelector('#menuLanguage').textContent = translation.menuLanguage;
    document.querySelector('#menuLangEnglish').textContent = translation.menuLangEnglish;
    document.querySelector('#menuLangPortuguese').textContent = translation.menuLangPortuguese;
    document.querySelector('#txtFavorites').textContent = translation.menuHome;
    document.querySelector('#txtRecently').textContent = translation.menuProducts;
    document.querySelector('#txtMap').textContent = translation.menuServices;
    document.querySelector('#homeContentTitleText').textContent = translation.homeContentTitleText;
    document.querySelector('#homeContentText').innerHTML = translation.homeContentText;
    document.querySelector('#footerText').textContent = translation.footerText;
}