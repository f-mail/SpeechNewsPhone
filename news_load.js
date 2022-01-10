/////////////////////////////////////////////////////////////////////////////////////
// RENDERS
/////////////////////////////////////////////////////////////////////////////////////

function renderItems(items, title = "") {
    let titleHtml = document.createElement("p");
    titleHtml.innerHTML = title;

    if (items === null) {
        titleHtml.innerHTML = "Ошибка подключения!";
        document.body.appendChild(titleHtml);
        return;
    }

    let ol = document.createElement("ol");
    ol.className = "list";  
    for (let item of items) {
        let nobr = document.createElement("nobr");
        nobr.innerHTML =
        item.source + " > " +
        "W " + Math.round(item.weight) + " : " +
        "P " + item.priority + " :: " +
        item.title + " :: " +
        item.desc + " :: " +
        item.link + " :: " +
        item.date;
        let span = document.createElement("span");
        span.appendChild(nobr);
        let li = document.createElement("li");
        li.appendChild(span);
        ol.appendChild(li);
    }

    document.body.appendChild(titleHtml);
    document.body.appendChild(ol);
}

/////////////////////////////////////////////////////////////////////////////////////
// ENTRY POINT
/////////////////////////////////////////////////////////////////////////////////////

var yamain = "empty";
var yaworld = "empty";
var yascience = "empty";
var yacomputers = "empty";
var yaculture = "empty";

yamain = `

<div class="news-navigation-menu__wrapper" role="presentation">
 <h2 class="mg-aria-label">Новостные рубрики</h2>
 <nav class="mg-navigation-menu news-navigation-menu">
  <div class="mg-navigation-menu__items" role="list">
   <div class="mg-navigation-menu__item-wrap" style="z-index:1" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-2"><span class="news-navigation-menu__title">Главное</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-3"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:2" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/region/yuzhno-sakhalinsk" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-4"><span class="news-navigation-menu__title">Южно-Сахалинск</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-5"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:3" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/personal_feed" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-6"><span class="news-navigation-menu__title">Интересное</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-7"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:4" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/koronavirus" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-8"><span class="news-navigation-menu__title">Коронавирус</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-9"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:5" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/politics" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-10"><span class="news-navigation-menu__title">Политика</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-11"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:6" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/society" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-12"><span class="news-navigation-menu__title">Общество</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-13"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:7" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/business" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-14"><span class="news-navigation-menu__title">Экономика</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-15"><span class="news-navigation-menu__title">В мире</span></a></span>
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap mg-navigation-menu__item-wrap_active" style="z-index:8" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer mg-navigation-menu__item-wrap-outer_active">
     <div class="mg-navigation-menu__item-wrap-inner mg-navigation-menu__item-wrap-inner_active">
      <a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-16"><span class="news-navigation-menu__title">В мире</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:9" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/sport?utm_source=yxnews&amp;utm_medium=desktop" target="_blank" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-17"><span class="news-navigation-menu__title">Спорт</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:10" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/incident" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-18"><span class="news-navigation-menu__title">Происшествия</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:11" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/culture" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-19"><span class="news-navigation-menu__title">Культура</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:12" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/computers" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-20"><span class="news-navigation-menu__title">Технологии</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:13" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/science" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-21"><span class="news-navigation-menu__title">Наука</span></a>
     </div>
    </div>
    <div class="mg-navigation-menu__extra-items" aria-hidden="true">
     <div class="mg-navigation-menu__more-container" role="presentation">
      <div class="mg-navigation-menu__more">
       <span class="news-navigation-menu__item">Ещё</span>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-navigation-menu__item-wrap" style="z-index:14" role="listitem">
    <div class="mg-navigation-menu__item-wrap-outer">
     <div class="mg-navigation-menu__item-wrap-inner">
      <a href="https://yandex.ru/news/rubric/auto" rel="noopener" class="news-navigation-menu__item" data-log-id="u-1641726614000-86c854-22"><span class="news-navigation-menu__title">Авто</span></a>
     </div>
    </div>
   </div>
  </div>
  <div class="mg-navigation-menu__extra-items" aria-hidden="true">
   <span class="mg-navigation-menu__active-item mg-navigation-menu__active-item_active"><a href="https://yandex.ru/news/rubric/world" rel="noopener" class="news-navigation-menu__item news-navigation-menu__item_active" aria-current="page" data-log-id="u-1641726614000-86c854-23"><span class="news-navigation-menu__title">В мире</span></a></span>
   <div class="mg-navigation-menu__more-container" role="presentation">
    <div class="mg-navigation-menu__more">
     <span class="news-navigation-menu__item">Ещё</span>
    </div>
   </div>
  </div>
 </nav>
</div>
<div class="news-app__content">
 <div class="mg-grid__row mg-grid__row_gap_8">
  <div class="mg-grid__col mg-grid__col_xs_12 mg-grid__col_sm_9">
   <div class="news-top-rubric-heading news-app__heading">
    <h1 class="news-top-rubric-heading__title">В мире</h1>
   </div>
   <div class="mg-grid__row mg-grid__row_gap_8 news-top-flexible-stories news-app__top">
    <div class="mg-grid__col mg-grid__col_xs_8">
     <div class="mg-card mg-card_type_image mg-card_stretching mg-card_flexible-double mg-grid__item">
      <div class="mg-card__media">
       <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image" data-log-id="u-1641726614000-86c854-25">
        <div class="mg-card-media__image">
         <img class="neo-image neo-image_loaded" alt="" src="https://avatars.mds.yandex.net/get-ynews/5651125/19853763ec7c5dda9a9d4c8ffa420601/380x380" style="background-color:#C5C6CB">
        </div>
       </div>
      </div>
      <div class="mg-card__inner">
       <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Belyj_dom_otreagiroval_nakhamstvo_gossekretarya_SSHA_vstoronu_RF--328864230524fe7f02849324251e14b5?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=y2ZxRL0ATpOpDoJ2Lcwz&amp;t=1641726329&amp;persistent_id=176716599" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-26">Белый дом отреагировал на&nbsp;хамство госсекретаря США в&nbsp;сторону РФ</a></h2>
       <div class="mg-card__annotation">
        «Заявления, которые накануне сделал госсекретарь Блинкен, отражают позицию США в переговорах», — сказал представитель администрации в ходе телефонного брифинга.
       </div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/41096/2648-1516183392375-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Belyj_dom_otreagiroval_nakhamstvo_gossekretarya_SSHA_vstoronu_RF--328864230524fe7f02849324251e14b5?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=y2ZxRL0ATpOpDoJ2Lcwz&amp;t=1641726329&amp;persistent_id=176716599" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: URA.Ru" data-log-id="u-1641726614000-86c854-28">URA.Ru</a></span>
          <span class="mg-card-source__time">21:41</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
    </div>
    <div class="mg-grid__col mg-grid__col_xs_4">
     <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item">
      <div class="mg-card__text-content">
       <div class="mg-card__text">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Antitela_posle_COVID-19_okazalis_sposobny_atakovat_zdorovye_kletki--73f3ed81dd11c6d19aff0169753e89ff?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=C4LRLj_BDvszXulQx6Tx&amp;t=1641726329&amp;tt=true&amp;persistent_id=176447597" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-30">Антитела после COVID-19 оказались способны атаковать здоровые клетки</a></h2>
        <div class="mg-card__annotation">
         Ученые установили, что через несколько месяцев после того, как человек выздоровел от коронавируса, у него наблюдается повышенный уровень антител, которые могут работать неправильно.
        </div>
       </div>
      </div>
      <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/2354295/ca5129ba38d17adcd92da82fe0563acf/366x183)"></div>
      <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
       <div class="mg-card-footer__left">
        <div class="mg-card-source mg-card__source mg-card__source_dot">
         <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
           <div class="mg-favorites-dot__image">
            <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square" width="16" height="16">
           </div></span><a href="https://yandex.ru/news/story/Antitela_posle_COVID-19_okazalis_sposobny_atakovat_zdorovye_kletki--73f3ed81dd11c6d19aff0169753e89ff?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=C4LRLj_BDvszXulQx6Tx&amp;t=1641726329&amp;tt=true&amp;persistent_id=176447597" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: РИА Новости" data-log-id="u-1641726614000-86c854-32">РИА Новости</a></span>
         <span class="mg-card-source__time">21:38</span>
        </div>
       </div>
       <div class="mg-card-footer__right"></div>
      </div>
     </div>
    </div>
    <div class="mg-grid__col mg-grid__col_xs_4">
     <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item">
      <div class="mg-card__text-content">
       <div class="mg-card__text">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Predstavitel_Pentagona_Kirbi_SSHA_ne_namereny_cnizhat_chislennost_vojsk_vEvrope--40d4215c6831351773ce972996795b17?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=vqMCdb4G2Y_BfST0KSJ5&amp;t=1641726329&amp;persistent_id=176714356" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-34">Представитель Пентагона Кирби: США не намерены cнижать численность войск в&nbsp;Европе</a></h2>
        <div class="mg-card__annotation">
         Ранее в январе NBC News со ссылкой на источник сообщил, что Соединенные Штаты могут обсудить на переговорах с Россией сокращение числа своих войск в Восточной Европе.
        </div>
       </div>
      </div>
      <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/3178858/416979d42c702eb5b9380dacebd578a4/366x183)"></div>
      <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
       <div class="mg-card-footer__left">
        <div class="mg-card-source mg-card__source mg-card__source_dot">
         <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
           <div class="mg-favorites-dot__image">
            <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/41096/1040-1640775230584-square/logo-square" width="16" height="16">
           </div></span><a href="https://yandex.ru/news/story/Predstavitel_Pentagona_Kirbi_SSHA_ne_namereny_cnizhat_chislennost_vojsk_vEvrope--40d4215c6831351773ce972996795b17?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=vqMCdb4G2Y_BfST0KSJ5&amp;t=1641726329&amp;persistent_id=176714356" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Газета.Ru" data-log-id="u-1641726614000-86c854-36">Газета.Ru</a></span>
         <span class="mg-card-source__time">18:53</span>
        </div>
       </div>
       <div class="mg-card-footer__right"></div>
      </div>
     </div>
    </div>
    <div class="mg-grid__col mg-grid__col_xs_4">
     <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item">
      <div class="mg-card__text-content">
       <div class="mg-card__text">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Glava_MID_Kipra_KHristodulidis_obyavil_ob_otstavke--e790517f429b0608dad712bdb9ae39ed?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=ryrs&amp;t=1641726329&amp;tt=true&amp;persistent_id=176741226" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-38">Глава МИД Кипра Христодулидис объявил об отставке</a></h2>
        <div class="mg-card__annotation">
         Министр иностранных дел Кипра Никос Христодулидис выступил перед журналистами, которых пригласил в МИД, и объявил, что уходит в отставку, его заявление распространило правительственное бюро печати и информации.
        </div>
       </div>
      </div>
      <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/3332920/2385679cd89ed9dba51a93e8dc9fb154/366x183)"></div>
      <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
       <div class="mg-card-footer__left">
        <div class="mg-card-source mg-card__source mg-card__source_dot">
         <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
           <div class="mg-favorites-dot__image">
            <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square" width="16" height="16">
           </div></span><a href="https://yandex.ru/news/story/Glava_MID_Kipra_KHristodulidis_obyavil_ob_otstavke--e790517f429b0608dad712bdb9ae39ed?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=ryrs&amp;t=1641726329&amp;tt=true&amp;persistent_id=176741226" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: РИА Новости" data-log-id="u-1641726614000-86c854-40">РИА Новости</a></span>
         <span class="mg-card-source__time">21:53</span>
        </div>
       </div>
       <div class="mg-card-footer__right"></div>
      </div>
     </div>
    </div>
    <div class="mg-grid__col mg-grid__col_xs_4">
     <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item">
      <div class="mg-card__text-content">
       <div class="mg-card__text">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Virusolog_Kostrikkis_zayavil_chto_naKipre_vyyavili_gibridnyj_shtamm_SARS-CoV-2_deltakron--6c958880ddcc9703b7d98b6c08dd8748?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=tZ0FmlKNBM33z6Q5EnMH&amp;t=1641726329&amp;tt=true&amp;persistent_id=176707624" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-42">Вирусолог Костриккис заявил, что на&nbsp;Кипре выявили гибридный штамм SARS-CoV-2 «дельтакрон»</a></h2>
        <div class="mg-card__annotation">
         Группа ученых с факультета биологических наук Университета Кипра обнаружила новый вариант коронавируса "дельтакрон" — гибрид "дельты" и "омикрона".
        </div>
       </div>
      </div>
      <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/2373085/ac559733ce2695540e5e43c53e9654d0/366x183)"></div>
      <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
       <div class="mg-card-footer__left">
        <div class="mg-card-source mg-card__source mg-card__source_dot">
         <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
           <div class="mg-favorites-dot__image">
            <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square" width="16" height="16">
           </div></span><a href="https://yandex.ru/news/story/Virusolog_Kostrikkis_zayavil_chto_naKipre_vyyavili_gibridnyj_shtamm_SARS-CoV-2_deltakron--6c958880ddcc9703b7d98b6c08dd8748?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=tZ0FmlKNBM33z6Q5EnMH&amp;t=1641726329&amp;tt=true&amp;persistent_id=176707624" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: РИА Новости" data-log-id="u-1641726614000-86c854-44">РИА Новости</a></span>
         <span class="mg-card-source__time">21:43</span>
        </div>
       </div>
       <div class="mg-card-footer__right"></div>
      </div>
     </div>
    </div>
   </div>
   <div class="neo-advert mg-advert mg-advert_type_native mg-advert__card news-advert-group news-app__advert-group" data-log-id="u-1641726614000-86c854-46">
    <div class="mg-grid__row mg-grid__row_gap_8 mg-advert__loader-group">
     <div class="mg-grid__col mg-grid__col_xs_4 mg-advert__loader-group-item">
      <div class="mg-grid__item mg-grid__item_type_card">
       <div class="mg-advert__loader mg-advert__loader_card mg-advert__loader_animated">
        <div class="mg-advert__loader-text-top"></div>
        <div class="mg-advert__loader-text-bottom"></div>
        <div class="mg-advert__loader-picture"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4 mg-advert__loader-group-item">
      <div class="mg-grid__item mg-grid__item_type_card">
       <div class="mg-advert__loader mg-advert__loader_card mg-advert__loader_animated">
        <div class="mg-advert__loader-text-top"></div>
        <div class="mg-advert__loader-text-bottom"></div>
        <div class="mg-advert__loader-picture"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4 mg-advert__loader-group-item">
      <div class="mg-grid__item mg-grid__item_type_card">
       <div class="mg-advert__loader mg-advert__loader_card mg-advert__loader_animated">
        <div class="mg-advert__loader-text-top"></div>
        <div class="mg-advert__loader-text-bottom"></div>
        <div class="mg-advert__loader-picture"></div>
       </div>
      </div>
     </div>
    </div>
    <div id="u-1641726614000-86c854-45"></div>
   </div>
   <div class="news-feed news-app__feed">
    <div class="mg-grid__row mg-grid__row_gap_8">
     <div class="mg-grid__col mg-grid__col_xs_8">
      <div class="mg-card mg-card_type_image mg-card_stretching mg-card_flexible-double mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__media">
        <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image" data-log-id="u-1641726614000-86c854-49-1">
         <div class="mg-card-media__image">
          <img class="neo-image neo-image_loaded" alt="" src="https://avatars.mds.yandex.net/get-ynews/3315358/46ac720dbbc120aebef78bf027a0a31a/380x380" style="background-color:#888B7D">
         </div>
        </div>
       </div>
       <div class="mg-card__inner">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/EHti_povsednevnye_zanyatiya_povyshayut_risk_zabolet_COVID-19--6df8fb8738ddde3a8fc25c30f67f0ff6?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=HHsGFSYMEtOpNAcHijwP&amp;t=1641726329&amp;persistent_id=176687063" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-50-1">Эти повседневные занятия повышают риск заболеть COVID-19</a></h2>
        <div class="mg-card__annotation">
         Группа учёных из Institute of Health Informatics в Великобритании опубликовали список повседневных занятий, которые связаны с повышенным риском заразиться коронавирусом.
        </div>
        <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
         <div class="mg-card-footer__left">
          <div class="mg-card-source mg-card__source mg-card__source_dot">
           <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
             <div class="mg-favorites-dot__image">
              <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/966506/1670-1551172901405-square/logo-square" width="16" height="16">
             </div></span><a href="https://yandex.ru/news/story/EHti_povsednevnye_zanyatiya_povyshayut_risk_zabolet_COVID-19--6df8fb8738ddde3a8fc25c30f67f0ff6?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=HHsGFSYMEtOpNAcHijwP&amp;t=1641726329&amp;persistent_id=176687063" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Ferra" data-log-id="u-1641726614000-86c854-52-1">Ferra</a></span>
           <span class="mg-card-source__time">20:59</span>
          </div>
         </div>
         <div class="mg-card-footer__right"></div>
        </div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Professor_Kolekhmajnen_nazval_upotreblenie_rzhanogo_khleba_poleznym_dlyaprofilaktiki_raka--26f2cb5571653c7d281b22950dc182e8?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=SXtf5CXsWXcBB_X3wNfO&amp;t=1641726329&amp;persistent_id=176671577" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-54-1">Профессор Колехмайнен назвал употребление ржаного хлеба полезным для&nbsp;профилактики рака</a></h2>
         <div class="mg-card__annotation">
          Специалист подчеркнул, что в состав ржаного хлеба входит не только клетчатка, но и другие полезные для человека вещества.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/5108727/e1db09ff9d04f33261846234c0c15c72/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/254114979-1478693761853-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Professor_Kolekhmajnen_nazval_upotreblenie_rzhanogo_khleba_poleznym_dlyaprofilaktiki_raka--26f2cb5571653c7d281b22950dc182e8?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=SXtf5CXsWXcBB_X3wNfO&amp;t=1641726329&amp;persistent_id=176671577" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: ФАН" data-log-id="u-1641726614000-86c854-56-1">ФАН</a></span>
          <span class="mg-card-source__time">21:58</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/NRK_voennye_vNorvegii_ostalis_bezpostavok_trusov_iz-zapandemii_koronavirusa--fbf8a54cbd2afe308ee8679dc3c752d1?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=MssSgkgZvtl-9T4F2KH_&amp;t=1641726329&amp;tt=true&amp;persistent_id=176678993" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-58-1">NRK: военные в&nbsp;Норвегии остались без&nbsp;поставок трусов из-за&nbsp;пандемии коронавируса</a></h2>
         <div class="mg-card__annotation">
          Армия Норвегии столкнулась с нехваткой нижнего белья в период пандемии коронавируса.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/31531/ca1541ba52bbda16c924c8fee2e53751/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/41096/1040-1640775230584-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/NRK_voennye_vNorvegii_ostalis_bezpostavok_trusov_iz-zapandemii_koronavirusa--fbf8a54cbd2afe308ee8679dc3c752d1?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=MssSgkgZvtl-9T4F2KH_&amp;t=1641726329&amp;tt=true&amp;persistent_id=176678993" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Газета.Ru" data-log-id="u-1641726614000-86c854-60-1">Газета.Ru</a></span>
          <span class="mg-card-source__time">21:46</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Nakhodki_200_let_smushhavshie_geologov_okazalis_sledami_moshhnejshikh_zemletryasenij--c9b80dc8f1ae0007ce88c47658809f87?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=XeTErcP4bfyQs4UM_u-R&amp;t=1641726329&amp;persistent_id=176650827" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-62-1">Находки, 200 лет смущавшие геологов, оказались следами мощнейших землетрясений</a></h2>
         <div class="mg-card__annotation">
          Странные находки, почти двести лет остающиеся загадкой для археологов, оказались замысловатыми посланиями из далекого прошлого Земли, оставшимися на месте мощных землетрясений.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/2363534/06dff4dd80d198b48fb5d872bdd2408e/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/41096/1040-1640775230584-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Nakhodki_200_let_smushhavshie_geologov_okazalis_sledami_moshhnejshikh_zemletryasenij--c9b80dc8f1ae0007ce88c47658809f87?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=XeTErcP4bfyQs4UM_u-R&amp;t=1641726329&amp;persistent_id=176650827" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Газета.Ru" data-log-id="u-1641726614000-86c854-64-1">Газета.Ru</a></span>
          <span class="mg-card-source__time">20:58</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="neo-advert mg-advert mg-advert_type_native mg-advert__card news-feed__advert mg-grid__item mg-grid__item_type_card" data-log-id="u-1641726614000-86c854-65-1">
       <div class="mg-advert__loader mg-advert__loader_card mg-advert__loader_animated">
        <div class="mg-advert__loader-text-top"></div>
        <div class="mg-advert__loader-text-bottom"></div>
        <div class="mg-advert__loader-picture"></div>
       </div>
       <div id="u-1641726614000-86c854-48"></div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Kancler_FRG_ne_smozhet_bystro_vvesti_obyazatelnuyu_privivku_Tagesspiegel--2b358d074c56dbb2e45d9e8256b29a9f?lang=ru&amp;rubric=world&amp;fan=1&amp;t=1641726329&amp;persistent_id=176586061" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-67-1">Канцлер ФРГ не сможет быстро ввести обязательную прививку&nbsp;— Tagesspiegel</a></h2>
         <div class="mg-card__annotation">
          Быстрое введение обязательной вакцинации против коронавируса в Германии, обещанное бундесканцлером ФРГ Олафом Шольцом, невозможно, пишет 9 января немецкая газета Tagesspiegel.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/5697170/291727effb39d8250e04565f89af02fb/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/786982/254151524-1528881720128-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Kancler_FRG_ne_smozhet_bystro_vvesti_obyazatelnuyu_privivku_Tagesspiegel--2b358d074c56dbb2e45d9e8256b29a9f?lang=ru&amp;rubric=world&amp;fan=1&amp;t=1641726329&amp;persistent_id=176586061" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: ИА Красная Весна" data-log-id="u-1641726614000-86c854-69-1">ИА Красная Весна</a></span>
          <span class="mg-card-source__time">21:44</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_8">
      <div class="mg-card mg-card_type_image mg-card_stretching mg-card_flexible-double mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__media">
        <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image" data-log-id="u-1641726614000-86c854-71-1">
         <div class="mg-card-media__image" style="background-color:#E4DCD0"></div>
        </div>
       </div>
       <div class="mg-card__inner">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Daily_Express_sakharosoderzhashhie_napitki_povyshayut_na32_risk_razvitiya_raka_kishechnika--6d41646c283eedf034cbf3f1a15fb3a2?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=3BDjowfrxj3WfpHxmlB0&amp;t=1641726329&amp;persistent_id=176623983" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-72-1">Daily Express: сахаросодержащие напитки повышают на&nbsp;32% риск развития рака кишечника</a></h2>
        <div class="mg-card__annotation">
         Daily Express пишет о том, что сахаросодержащие напитки повышают на 32% риск развития рака кишечника. Об этом сообщает solenka.info.
        </div>
        <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
         <div class="mg-card-footer__left">
          <div class="mg-card-source mg-card__source mg-card__source_dot">
           <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
             <div class="mg-favorites-dot__image">
              <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/117671/254128747-1637942290682-square/logo-square" width="16" height="16">
             </div></span><a href="https://yandex.ru/news/story/Daily_Express_sakharosoderzhashhie_napitki_povyshayut_na32_risk_razvitiya_raka_kishechnika--6d41646c283eedf034cbf3f1a15fb3a2?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=3BDjowfrxj3WfpHxmlB0&amp;t=1641726329&amp;persistent_id=176623983" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Solenka.info" data-log-id="u-1641726614000-86c854-74-1">Solenka.info</a></span>
           <span class="mg-card-source__time">21:32</span>
          </div>
         </div>
         <div class="mg-card-footer__right"></div>
        </div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="neo-advert mg-advert mg-advert_type_native mg-advert__card news-feed__advert mg-grid__item mg-grid__item_type_card" data-log-id="u-1641726614000-86c854-75-1">
       <div class="mg-advert__loader mg-advert__loader_card mg-advert__loader_animated">
        <div class="mg-advert__loader-text-top"></div>
        <div class="mg-advert__loader-text-bottom"></div>
        <div class="mg-advert__loader-picture"></div>
       </div>
       <div id="u-1641726614000-86c854-49"></div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/EHkspert_zayavil_chto_SSHA_prilagayut_malo_usilij_poborbe_smusorom_vkosmose--f771e57a4a7b90f728c4a81097313c82?lang=ru&amp;rubric=world&amp;fan=1&amp;t=1641726329&amp;persistent_id=176740395" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-77-1">Эксперт заявил, что США прилагают мало усилий по&nbsp;борьбе с&nbsp;мусором в&nbsp;космосе</a></h2>
         <div class="mg-card__annotation">
          Член комитета по космическому мусору Международной академии астронавтики (IAA) Даррен Макнайт заявил, что США отстают от других космических держав в сфере борьбы с космическим мусором.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/5859175/d3b58bfc8946602bc5832c32a9c55684/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/1014-1627575534690-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/EHkspert_zayavil_chto_SSHA_prilagayut_malo_usilij_poborbe_smusorom_vkosmose--f771e57a4a7b90f728c4a81097313c82?lang=ru&amp;rubric=world&amp;fan=1&amp;t=1641726329&amp;persistent_id=176740395" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: REGNUM" data-log-id="u-1641726614000-86c854-79-1">REGNUM</a></span>
          <span class="mg-card-source__time">21:26</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Kompaniya_Toyota_prevratila_krossover_Toyota_RAV4_vspectransport_dlyaspasatelej--f63ef4d30fe0c6e8a34091d3ccdf7a26?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=BM4lQARF&amp;t=1641726329&amp;persistent_id=176735969" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-81-1">Компания Toyota превратила кроссовер Toyota RAV4 в&nbsp;спецтранспорт для&nbsp;спасателей</a></h2>
         <div class="mg-card__annotation">
          Компания Toyota привезет на автосалон в Токио новый концепт RAV4 5D Adventure 2022, построенный на базе серийного кроссовера RAV4.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/5928022/de183e811922f3df9476ddd49800070c/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/56838/254054748-1478693377904-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Kompaniya_Toyota_prevratila_krossover_Toyota_RAV4_vspectransport_dlyaspasatelej--f63ef4d30fe0c6e8a34091d3ccdf7a26?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=BM4lQARF&amp;t=1641726329&amp;persistent_id=176735969" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Автоновости дня" data-log-id="u-1641726614000-86c854-83-1">Автоновости дня</a></span>
          <span class="mg-card-source__time">21:02</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_8">
      <div class="mg-card mg-card_type_image mg-card_stretching mg-card_flexible-double mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__media">
        <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image" data-log-id="u-1641726614000-86c854-85-1">
         <div class="mg-card-media__image" style="background-color:#1F1E1A"></div>
        </div>
       </div>
       <div class="mg-card__inner">
        <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Socset_Trampa_TRUTH_Social_zapustitsya_21_fevralya--f3cbe7fa52a148d9a7c331f4ad2cd432?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=5E6p21K8edSS8OnYnr6A&amp;t=1641726329&amp;persistent_id=176622561" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-86-1">Соцсеть Трампа TRUTH Social запустится 21 февраля</a></h2>
        <div class="mg-card__annotation">
         Новая социальная сеть TRUTH Social, созданная компанией экс-президента США Дональда Трампа Trump Media &amp; Technology Group, будет запущена 21 февраля.
        </div>
        <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
         <div class="mg-card-footer__left">
          <div class="mg-card-source mg-card__source mg-card__source_dot">
           <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
             <div class="mg-favorites-dot__image">
              <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/26056/1048-1478692902313-square/logo-square" width="16" height="16">
             </div></span><a href="https://yandex.ru/news/story/Socset_Trampa_TRUTH_Social_zapustitsya_21_fevralya--f3cbe7fa52a148d9a7c331f4ad2cd432?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=5E6p21K8edSS8OnYnr6A&amp;t=1641726329&amp;persistent_id=176622561" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: Коммерсантъ" data-log-id="u-1641726614000-86c854-88-1">Коммерсантъ</a></span>
           <span class="mg-card-source__time">21:42</span>
          </div>
         </div>
         <div class="mg-card-footer__right"></div>
        </div>
       </div>
      </div>
     </div>
     <div class="mg-grid__col mg-grid__col_xs_4">
      <div class="mg-card mg-card_flexible-single mg-card_media-fixed-height mg-card_type_image mg-grid__item mg-grid__item_type_card">
       <div class="mg-card__text-content">
        <div class="mg-card__text">
         <h2 class="mg-card__title"><a href="https://yandex.ru/news/story/Pravyashhaya_partiya_Germanii_zapusk_Severnogo_potoka_2_sootvetstvuet_zhelaniyam_nemcev--df28b7efb1aa0d45b419091d939adf68?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=XLJxdJQaBtk1JO6dXYve&amp;t=1641726329&amp;tt=true&amp;persistent_id=176711249" target="_self" rel="noopener" class="mg-card__link" data-log-id="u-1641726614000-86c854-90-1">Правящая партия Германии: запуск «Северного потока&nbsp;— 2» соответствует желаниям немцев</a></h2>
         <div class="mg-card__annotation">
          В правящей партии ФРГ - Социал-демократической партии Германии (СДПГ) - заявили, что запуск "Северного потока — 2" не связан с политикой, соответствует желаниям немцев.
         </div>
        </div>
       </div>
       <div class="mg-card__media-block mg-card__media-block_type_image" style="background-image:url(https://avatars.mds.yandex.net/get-ynews/2448951/39c3e169581b924da2d73593dea836d6/366x183)"></div>
       <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
        <div class="mg-card-footer__left">
         <div class="mg-card-source mg-card__source mg-card__source_dot">
          <span class="mg-card-source__source"><span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
            <div class="mg-favorites-dot__image">
             <img class="neo-image neo-image_loaded" alt="" src="//avatars.mds.yandex.net/get-ynews-logo/135513/1002-1544074003449-square/logo-square" width="16" height="16">
            </div></span><a href="https://yandex.ru/news/story/Pravyashhaya_partiya_Germanii_zapusk_Severnogo_potoka_2_sootvetstvuet_zhelaniyam_nemcev--df28b7efb1aa0d45b419091d939adf68?lang=ru&amp;rubric=world&amp;fan=1&amp;stid=XLJxdJQaBtk1JO6dXYve&amp;t=1641726329&amp;tt=true&amp;persistent_id=176711249" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: РИА Новости" data-log-id="u-1641726614000-86c854-92-1">РИА Новости</a></span>
          <span class="mg-card-source__time">21:56</span>
         </div>
        </div>
        <div class="mg-card-footer__right"></div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="mg-spinner news-app__spinner"></div>
  </div>
  <div class="mg-grid__col mg-grid__col_xs_0 mg-grid__col_sm_3">
   <div class="mg-sticky">
    <div class="mg-sticky__content">
     <div class="mg-sticky__inner">
      <div class="mg-advert__column mg-grid__item">
       <div class="neo-advert mg-advert mg-advert_type_partner mg-advert__column-item" data-log-id="u-1641726614000-86c854-51">
        <div class="mg-advert__loader mg-advert__loader_column mg-advert__loader_animated">
         <div class="mg-advert__loader-placeholders">
          <div class="mg-advert__loader-text-top"></div>
          <div class="mg-advert__loader-text-bottom"></div>
          <div class="mg-advert__loader-picture"></div>
          <div class="mg-advert__loader-divider"></div>
          <div class="mg-advert__loader-text-top"></div>
          <div class="mg-advert__loader-text-bottom"></div>
          <div class="mg-advert__loader-picture"></div>
          <div class="mg-advert__loader-divider"></div>
          <div class="mg-advert__loader-text-top"></div>
          <div class="mg-advert__loader-text-bottom"></div>
          <div class="mg-advert__loader-picture"></div>
         </div>
        </div>
        <div id="u-1641726614000-86c854-50"></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</div>
<div class="neo-advert news-advert news-advert_mode_daas" data-log-id="u-1641726614000-86c854-53">
 <div id="u-1641726614000-86c854-52"></div>
</div>


`


LoadNews("feed2")
    .then(res => renderItems(res));
