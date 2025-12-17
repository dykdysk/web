const DonutsData = {
    promotions: [
        {
            id: 1,
            description: "Купи 2 пончика и получи третий в подарок",
            image: "../images/1.png"
        },
        {
            id: 2,
            description: "При заказе от 50 рублей доставка бесплатно",
            image: "../images/3.png"
        },
        {
            id: 3,
            description: "При заказе от 10 пончиков скидка 20%",
            image: "../images/2.png"
        },

        {
            id: 4,
            description: "Скидка по студенческому 10%",
            image: "../images/4.png"
        },
        {
            id: 5,
            description: "В день рождения скидка 30%",
            image: "../images/5.png"
        },
    ],

    boxes: [
        {
            id: 1,
            title: "Маленький",
            description: "Идеальный набор для одного человека. 4 любых пончика.",
            price: 12,
            image: "../images/бокс на 4.png",
            quantity: 4
        },
        {
            id: 2,
            title: "Средний",
            description: "Отличный выбор для небольшой компании. 8 любых пончиков.",
            price: 22,
            image: "../images/бокс на 8.png",
            quantity: 8
        },
        {
            id: 3,
            title: "Большой",
            description: "Для большой компании или праздника. 12 любых пончиков.",
            price: 30,
            image: "../images/бокс на 12.png",
            quantity: 12
        }
    ],

    catalog: [
        {
            id: 1,
            name: "Клубника с малиной",
            description: "Пончик в клубничной глазури с сублимированной малиной",
            price: 3.5,
            image: "../images/розовая глазурь + малина.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 2,
            name: "Клубника с шоколадом",
            description: "Пончик в нежной клубничной глазури с хрустящим шоколадом",
            price: 3.5,
            image: "../images/розовая глазурь + шоколад.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 3,
            name: "Клубника",
            description: "Пончик в глазури со вкусом спелой клубники",
            price: 2.5,
            image: "../images/розовая глазурь + посыпка.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 4,
            name: "Припудренный",
            description: "Классический пончик в сахарной пудре",
            price: 1.5,
            image: "../images/припудренный.png",
            categories: ["powdered"]
        },
        {
            id: 5,
            name: "Припудренный с вишневой начинкой",
            description: "Пончик в сахарной пудре и яркая вишневая начинка внутри",
            price: 3,
            image: "../images/припудренный с вишневой начинкой.png",
            categories: ["powdered", "filled"]
        },
        {
            id: 6,
            name: "Припудренный с клубничной начинкой",
            description: "Пончик в сахарной пудре и сладкая клубничная начинка внутри",
            price: 3,
            image: "../images/припудренный с клубничной начинкой.png",
            categories: ["powdered", "filled"]
        },
        {
            id: 7,
            name: "Ёлка",
            description: "Новогодний пончик в ванильной глазури с фигуркой в виде ёлки сверху",
            price: 4.5,
            image: "../images/новогодний белая глазурь.png",
            categories: ["new-year", "glazed"],
            isNew: true
        },
        {
            id: 8,
            name: "Новогодняя ваниль",
            description: "Новогодний пончик в ванильной глазури с праздничной посыпкой",
            price: 3.5,
            image: "../images/новогодний белая глазурь + посыпка.png",
            categories: ["new-year", "glazed", "with-sprinkles"],
            isNew: true
        },
        {
            id: 9,
            name: "Рождественский венок",
            description: "Новогодний пончик в глазури со вкусом груши в рождественском стиле",
            price: 4.5,
            image: "../images/новогодний зеленая глазурь.png",
            categories: ["new-year", "glazed"],
            isNew: true
        },
        {
            id: 10,
            name: "Новогодняя груша",
            description: "Новогодний пончик в глазури со вкусом груши с праздничной посыпкой",
            price: 3.5,
            image: "../images/новогодний зеленая глазурь + посыпка.png",
            categories: ["new-year", "glazed", "with-sprinkles"],
            isNew: true
        },
        {
            id: 11,
            name: "Снежинка",
            description: "Новогодний пончик в гранатовой глазури с посыпкой в форме снежинок",
            price: 3.5,
            image: "../images/новогодний красная глазурь.png",
            categories: ["new-year", "glazed", "with-sprinkles"],
            isNew: true
        },
        {
            id: 12,
            name: "Новогодний гранат",
            description: "Новогодний пончик в гранатовой глазури с праздничной посыпкой",
            price: 3.5,
            image: "../images/новогодний красная глазурь + посыпка.png",
            categories: ["new-year", "glazed", "with-sprinkles"],
            isNew: true
        },
        {
            id: 13,
            name: "Северный олень",
            description: "Новогодний пончик в шоколадной глазури напоминающий мордочку оленя",
            price: 4.5,
            image: "../images/новогодний шоколадная глазурь.png",
            categories: ["new-year", "glazed"],
            isNew: true
        },
        {
            id: 14,
            name: "С клубничной начинкой",
            description: "Пончик без глазури со сладкой клубничной начинкой внутри",
            price: 3,
            image: "../images/классический с клубничной начинкой.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 15,
            name: "С вишневой начинкой",
            description: "Пончик без глазури с начинкой из спелой вишни внутри",
            price: 3,
            image: "../images/классический с вишневой начинкой.png",
            categories: ["classic", "filled"]
        },
        {
            id: 16,
            name: "С ванильной начинкой",
            description: "Пончик без глазури с ванильной начинкой внутри",
            price: 3,
            image: "../images/классический с ванильной начинкой.png",
            categories: ["classic", "filled"]
        },
        {
            id: 17,
            name: "Классический",
            description: "Классический пончик без каких-либо дополнений",
            price: 1.5,
            image: "../images/классический.png",
            categories: ["classic"]
        },
        {
            id: 18,
            name: "Классический с топпингом",
            description: "Пончик без глазури с топпингом из белого шоколада",
            price: 2,
            image: "../images/классический + топпинг.png",
            categories: ["classic"]
        },
        {
            id: 19,
            name: "Классический с шоколадом",
            description: "Пончик без глазури с шоколадной посыпкой",
            price: 2.5,
            image: "../images/классический + шоколадная посыпка.png",
            categories: ["classic", "with-sprinkles"]
        },
        {
            id: 20,
            name: "Ваниль",
            description: "Пончик в нежной ванильной глазури с яркой посыпкой",
            price: 2.5,
            image: "../images/белая глазурь + посыпка.png",
            categories: ["glazed", "with-sprinkles"],
        },
        {
            id: 21,
            name: "Банан с орехами",
            description: "Пончик в банановой глазури с хрустящими орехами",
            price: 3.5,
            image: "../images/желтая глазурь + орехи.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 22,
            name: "Банан с малиной",
            description: "Пончик в сладкой банановой глазури с сублимированной малиной",
            price: 3.5,
            image: "../images/желтая глазурь + малина.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 23,
            name: "Банан с шоколадом",
            description: "Пончик в банановой глазури с кусочками шоколада сверху",
            price: 3.5,
            image: "../images/желтая глазурь + шоколад.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 24,
            name: "Шоколад с малиной",
            description: "Пончик в шоколадной глазури с сублимированной малиной сверху",
            price: 3.5,
            image: "../images/шоколадная глазурь + малина.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 25,
            name: "Шоколад с топпингом",
            description: "Пончик в шоколадной глазури с топпингом из белого шоколада",
            price: 3,
            image: "../images/шоколадная глазурь + топпинг.png",
            categories: ["glazed"]
        },
        {
            id: 26,
            name: "Шоколад с орехами",
            description: "Пончик в шоколадной глазури с хрустящими орехами",
            price: 3.5,
            image: "../images/шоколадная глазурь + орехи.png",
            categories: ["glazed", "with-sprinkles"]
        },
        {
            id: 27,
            name: "Шоколад",
            description: "Пончик в шоколадной глазури с разноцветной посыпкой",
            price: 2.5,
            image: "../images/шоколадная глазурь + посыпка.png",
            categories: ["glazed", "with-sprinkles"]
        },

        {
            id: 28,
            name: "Двойной шоколад",
            description: "Пончик в шоколадной глазури с кусочками шоколада сверху",
            price: 3.5,
            image: "../images/шоколадная глазурь + шоколадная посыпка.png",
            categories: ["glazed", "with-sprinkles"]
        },
    ]
};