const translations = {
    en: {
        menuLangEnglish: 'ENG · $',
        menuLangPortuguese: 'PT · R$',
        txtFavorites: 'Favorites',
        txtRecently: 'Recently Viewed',
        txtMap: 'Map',
        btnLogin: 'Login',
        mainText: 'Discover the perfect view for your next getaway',
        subText: `“Sight Inn, where every trip turns into <br> a unique experience”`,
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
        txtOption: 'Choose from <%= hotels.length %> hotel options',
        txtHotelName: 'Sunset Beach Hotel',
        txtHotelDesc: 'Hotel Description',
        txtAdr: 'Address',
        txtHotelDescPar: 'Check out the Oceanfront Paradise Hotel in Miami Beach, where beachside luxury meets modern comfort.',
        txtHotelDescPar2: 'Soak in amazing ocean views, stay in stylish rooms, and enjoy easy access to all the fun in South Beach.',
        txtHotelAmen: 'Hotel Amenities',
        txtHotelAllAmen: 'Show all Amenities',
        txtHotelPrice: '$ <%= hotel.quarto[0].valor %> night',
        txtPriceNight: '$ 500 x 3 nights',
        txtPricenoTax: '$ 1500',
        txtPriceTax: 'Total before taxes',
        txtPriceIncludeTax: '$ 1500',
        txtOverview: 'Overview',
        txtOverviewGuest: 'Guest Overall Rating',
        txtcleanrating: 'Cleanliness',
        txtlocalrating: 'Location',
        txtvaluerating: 'Value for Money',
        txtcommurating: 'Communication',
        footerText: 'All Rights Reserved ®',
    },
    pt: {
        menuLangEnglish: 'ENG · $',
        menuLangPortuguese: 'PT · R$',
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
        txtOption: 'Escolha entre <%= hotels.length %> opções de hotéis',
        txtHotelName: 'Sunset Beach Hotel',
        txtHotelDesc: 'Descrição do Hotel',
        txtAdr: 'Endereço',
        txtHotelDescPar: 'Descubra o Oceanfront Paradise Hotel em Miami Beach, onde luxo à beira-mar e comodidades modernas se encontram.',
        txtHotelDescPar2: 'Desfrute de vistas deslumbrantes do oceano, acomodações elegantes e acesso conveniente às atrações de South Beach.',
        txtHotelAmen: 'Comodidades do Hotel',
        txtHotelAllAmen: 'Mostrar todas as comodidades',
        txtHotelPrice: 'R$ <%= hotel.quarto[0].valor %> diária',
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
document.querySelector('#menuLangPortuguese').addEventListener('click', () => changeLang('pt'));

function changeLang(lang) {
    if (lang == 'en') {
        document.querySelector('#menuLangEnglish').style.color = '#F5a223';
        document.querySelector('#menuLangPortuguese').style.color = '#f1f1f1';
    }
    if (lang == 'pt') {
        document.querySelector('#menuLangPortuguese').style.color = '#F5a223';
        document.querySelector('#menuLangEnglish').style.color = '#f1f1f1';
    }

    const translation = translations[lang];

    document.querySelector('#menuLangEnglish').textContent = translation.menuLangEnglish;
    document.querySelector('#menuLangPortuguese').textContent = translation.menuLangPortuguese;
    document.querySelector('#txtFavorites').textContent = translation.txtFavorites;
    document.querySelector('#txtRecently').textContent = translation.txtRecently;
    document.querySelector('#txtMap').textContent = translation.txtMap;
    document.querySelector('#btnLogin').textContent = translation.btnLogin;
    document.querySelector('#mainText').textContent = translation.mainText;
    document.querySelector('#subText').innerHTML = translation.subText;
    document.querySelector('#txtLocation').textContent = translation.txtLocation;
    document.querySelector('#txtCheckin').textContent = translation.txtCheckin;
    document.querySelector('#txtCheckout').textContent = translation.txtCheckout;
    document.querySelector('#txtRooms').textContent = translation.txtRooms;
    document.querySelector('#txtPrice').textContent = translation.txtPrice;
    document.querySelector('#txtRating').textContent = translation.txtRating;
    document.querySelector('#txtType').textContent = translation.txtType;
    document.querySelector('#txtLocal').textContent = translation.txtLocal;
    document.querySelector('#removeFilters').textContent = translation.removeFilters;
    document.querySelector('#txtSuggest').textContent = translation.txtSuggest;
    document.querySelector('#txtOption').textContent = translation.txtOption;
    document.querySelector('#txtHotelName').textContent = translation.txtHotelName;
    document.querySelector('#txtHotelDesc').textContent = translation.txtHotelDesc;
    document.querySelector('#txtAdr').textContent = translation.txtAdr;
    document.querySelector('#txtRecentlyStays').textContent = translation.txtRecentlyStays;
    document.querySelector('#txtFavoritesStays').textContent = translation.txtFavoritesStays;
    document.querySelector('#txtHotelDescPar').textContent = translation.txtHotelDescPar;
    document.querySelector('#txtHotelDescPar2').textContent = translation.txtHotelDescPar2;
    document.querySelector('#txtHotelAmen').textContent = translation.txtHotelAmen;
    document.querySelector('#txtHotelAllAmen').textContent = translation.txtHotelAllAmen;
    document.querySelector('#txtHotelPrice').innerHTML = translation.txtHotelPrice;
    document.querySelector('#txtPriceNight').textContent = translation.txtPriceNight;
    document.querySelector('#txtPricenoTax').textContent = translation.txtPricenoTax;
    document.querySelector('#txtPriceTax').textContent = translation.txtPriceTax;
    document.querySelector('#txtPriceIncludeTax').textContent = translation.txtPriceIncludeTax;
    document.querySelector('#txtOverview').textContent = translation.txtOverview;
    document.querySelector('#txtOverviewGuest').textContent = translation.txtOverviewGuest;
    document.querySelector('#txtcleanrating').textContent = translation.txtcleanrating;
    document.querySelector('#txtlocalrating').textContent = translation.txtlocalrating;
    document.querySelector('#txtvaluerating').textContent = translation.txtvaluerating;
    document.querySelector('#txtcommurating').textContent = translation.txtcommurating;
    document.querySelector('#footerText').textContent = translation.footerText;
}
