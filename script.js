const answers = document.querySelector('#answers')
const progressbar = document.querySelector('#progressbar')
const questionTitle = document.querySelector('#question .title')
const questionDesc = document.querySelector('#question .description')
const nextBtn = document.querySelector('#next')
const bar = document.querySelector('#bar')
const test_body = document.querySelector('#test-body')
const test_result = document.querySelector('#test-result')
const filler = document.querySelector('#filler')
const seal = document.querySelector('#seal')
const tgblock = document.querySelector('#tg')

const questionsData = [
    {
        title: 'Память',
        desc: 'Оцените способность питомца долговременно запоминать места, события и людей',
        pos: 1,
        neg: 2
    },
    {
        title: 'Обучаемость',
        desc: 'Оцените усваиваемость команд и трюков питомцем при регулярных занятиях',
        pos: 1.8,
        neg: 1.4
    },
    {
        title: 'Решение задач',
        desc: 'Оцените умение находить простейшие пути к цели, не требующие дополнительных действий',
        pos: 1.2,
        neg: 1.7
    },
    {
        title: 'Адаптивность',
        desc: 'Оцените способность быстро привыкать к изменениям в окружающей среде (перестановка мебели, переезд)',
        pos: 1.2,
        neg: 1.5
    },
    {
        title: 'Социальный интеллект',
        desc: 'Оцените умение взаимодействовать с людьми и воспринимать сигналы (голос, жесты, призыв, невербальные подсказки)',
        pos: 1.4,
        neg: 1.3
    },
    {
        title: 'Эмоциональный интеллект',
        desc: 'Оцените чувствительность питомца к настроению человека',
        pos: 1.5,
        neg: 1.2
    },
    {
        title: 'Любознательность',
        desc: 'Оцените интерес к исследованию новых объектов, явлений и окружения',
        pos: 1.3,
        neg: 0.9
    },
    {
        title: 'Игровой интеллект',
        desc: 'Оцените тактический подход к игре и «охоте» за игрушкой (устраивание засад, использование разных приёмов и смена тактики)',
        pos: 1.3,
        neg: 0.9
    },
    {
        title: 'Наблюдательное обучение',
        desc: 'Оцените способность перенимать опыт, наблюдая за другими (попытки воспроизвести действия человека или других животных)',
        pos: 1.6,
        neg: 1.2
    },
    {
        title: 'Пространственная память',
        desc: 'Оцените умение запоминать расположение объектов в доме (миски, лоток, лежанки), а также скорость ориентации в пространстве',
        pos: 1.2,
        neg: 1.6
    },
    {
        title: 'Ориентация во времени',
        desc: 'Оцените понимание распорядка дня: приход хозяина, время кормления, сна, утреннего подъёма',
        pos: 1.1,
        neg: 1.4
    },
    {
        title: 'Объектная перманентность',
        desc: 'Оцените понимание того, что спрятанные объекты не исчезают (ищет ли питомец игрушку или лакомство после "исчезновения")',
        pos: 1,
        neg: 1.5
    },
    {
        title: 'Настойчивость',
        desc: 'Оцените упорство в достижении целей (предпринимает ли питомец повторные попытки и/или разные способы после неудачи)',
        pos: 1.4,
        neg: 1.1
    },
    {
        title: 'Креативность',
        desc: 'Оцените изобретательность при решении задач, требующих цепочку из нескольких последовательных действий',
        pos: 2,
        neg: 1.2
    },
    {
        title: 'Коммуникация',
        desc: 'Оцените способность питомца давать понять свои потребности, используя различные звуки и поведение',
        pos: 1.3,
        neg: 1.2
    },
]

const userAnswers = new Map

let qstIndex = -1

function pick(elem) {

    if (qstIndex >= questionsData.length) return

    clearAnswers()
    elem.classList.add('picked')

    const id = Array.from(answers.children).findIndex(elem =>
        elem.classList.contains('picked')
    )
    userAnswers.set(`${qstIndex}`, id)

    if (qstIndex == questionsData.length-1) {
        nextBtn.classList.add('complete')
        nextBtn.textContent = 'Завершить'
    }
}

function back() {
    if (qstIndex > 0 && qstIndex < questionsData.length) {
        qstIndex -= 1
        nextBtn.classList.remove('complete')
        nextBtn.textContent = 'Дальше'
        recover()
    }
}

function clearAnswers() {
    Array.from(answers.children).forEach(elem => {
        elem.classList.remove('picked')
    })
}

function recover() {
    clearAnswers()
    const id = userAnswers.get(`${qstIndex}`)
    pick(answers.children[id])
    questionTitle.textContent = questionsData[qstIndex].title
    questionDesc.textContent = questionsData[qstIndex].desc
    progressbar.style.width = `${ Math.round((qstIndex)/questionsData.length*100) }%`
}


function next() {
    if (qstIndex >= 0) {
        if (!userAnswers.has(`${qstIndex}`)) {
            return
        }
    }

    qstIndex += 1

    if (qstIndex < questionsData.length) {
        questionTitle.textContent = questionsData[qstIndex].title
        questionDesc.textContent = questionsData[qstIndex].desc

        userAnswers.has(`${qstIndex}`)? recover() : clearAnswers()

        progressbar.style.width = `${ Math.round((qstIndex)/questionsData.length*100) }%`

    } else {
        progressbar.style.width = '100%'
        progressbar.style.background = 'rgb(26, 203, 120)'

        testResult()
    }
}

next()

function testResult() {

    let count = 0
    let min = 0
    let max = 0

    userAnswers.keys().forEach(index => {
        const ans = userAnswers.get(index) - 2
        const data = questionsData[index]
        const points = ans > 0? ans * data.pos : ans * data.neg
        count += points

        min += -2 * data.neg
        max += 2 * data.pos
    })

    count = Math.round((count + Math.abs(min)) * 100) / 100
    max = Math.round((max + Math.abs(min)) * 100) / 100
    min = 0

    const percent = Math.round((count * 100 / max))

    test_body.style.opacity = 0.5

    questionTitle.textContent = 'Загрузка...'
    questionDesc.textContent = ''
    tgblock.style.display = 'flex'

    setTimeout(() => {
        test_body.style.display = 'none'
        test_result.style.display = 'flex'
        filler.textContent = percent + '%'
        progressbar.style.display = 'none'
        seal.style.display = 'flex'

        questionTitle.textContent = 'Результат'
        questionDesc.textContent = 'Ниже указан процент комплексной развитости интеллектуальных способностей вашего питомца'

        setTimeout(() => {
            bar.style.height = 100-percent + '%'

            setTimeout(() => {
                filler.style.color = 'black'

                setTimeout(() => {
                    seal.style.opacity = 1
                    seal.style.width = '140px'
                    seal.style.height = '140px'
                }, 900)

            }, 1500)
        }, 300)
    }, 1500)
}