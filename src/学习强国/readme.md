# 学习强国 积分明细页面修改

安装 PageSpy，手机 root 安装证书，打开 whistle 劫持学习强国页面

Whistle 规则：
~~~whistle
study.xuexi.cn disable://cache
# study.xuexi.cn/app/index.html whistle.inspect://e
study.xuexi.cn/app/index.html htmlPrepend://{html}
```html
<script crossorigin="anonymous" src="/page-spy/index.min.js"></script>
<script>
  new PageSpy();
</script>
```
study.xuexi.cn/page-spy/index.min.js http://localhost:6752/page-spy/index.min.js
study.xuexi.cn/api/v1 http://localhost:6752/api/v1
~~~


## Code
在 PageSpy 调试页面执行代码

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/39fda080-e199-4e80-a06a-2c783a40d31a">


<img width="1680" alt="image" src="https://github.com/user-attachments/assets/140b7768-26e1-41c1-945a-191a63907636">


```js
(() => {
    const 要修改成谁的名字 = '小明'
    const mockNumber = 40
    document.querySelector('ul.chart').style.width = `${13.333 * (mockNumber + 1)}vw`
    const calendarItemRender = ({ date }) => `
<li data-v-db3eddfe="" class="">
    <p data-v-db3eddfe="" class="date highlight">${date}</p>
    <p data-v-db3eddfe="" class="score highlight" style="bottom: 48.8px;"><span data-v-db3eddfe=""
            class="score-number">14</span><span data-v-db3eddfe="" class="score-unit">分</span></p>
    <p data-v-db3eddfe="" class="histogram" style="height: 44.8px;"></p>
</li>
`
    function generateCalendar() {
        let anchor = document.querySelector('ul.chart li.active')
        const container = document.querySelector('ul.chart')
        let today = new Date().getTime()
        let oneDay = 60 * 60 * 24 * 1000
        for (let i = mockNumber; i > 0; i--) {
            let curStamp = today - oneDay * i
            let curDate = new Date(curStamp)
            let text = `${(curDate.getMonth() + 1).toString().padStart(2, '0')}.${curDate.getDate().toString().padStart(2, '0')}`
            const parser = new DOMParser()
            let doms = parser.parseFromString(calendarItemRender({ date: text }), 'text/html')
            const newNode = doms.body.children[0]
            container.insertBefore(newNode, anchor)
        }
    }
    document.querySelectorAll('ul.chart li:not(.active)').forEach(e => e.remove())
    generateCalendar()

    document.querySelectorAll('ul.chart > li').forEach(li => {
        let date = li.querySelector('.date')
        let score = li.querySelector('.score-number')
        let graph = li.querySelector('.histogram')

        let changedScore = ~~(Math.random() * 8 + 11)
        let graphHeight = 3.2 * changedScore
        score.innerText = changedScore
        li.querySelector('p.score').style.bottom = `${4 + graphHeight}px`
        graph.style.height = `${graphHeight}px`

    })
    const curScore = +document.querySelector('li.active .score-number').innerText

    function changeName(name) {
        document.querySelector('.base-info__user__desc .name').innerText = name
        document.querySelector('.avatar-back').innerText = name.length === 2 ? name : name.slice(1)
    }

    function setScore() {
        document.querySelector('.base-info__grade .score').innerText = curScore
        document.querySelector('.base-info__grade .year-score').innerText = `年度积分：${curScore}`
    }

    changeName(要修改成谁的名字)
    setScore()


    const itemRender = ({ time, desc, score }) => `
    <li data-v-d06e777a="" class="list-item">
        <div data-v-d06e777a="" class="shrink-item">
            <p data-v-d06e777a="" class="list-item-time">${time}</p>
            <p data-v-d06e777a="" class="list-item-action">${desc}</p> <!----> <!---->
        </div>
        <p data-v-d06e777a="" class="wrap-list-item-score"><span data-v-d06e777a="" class="list-item-score">+${score}</span><span
                data-v-d06e777a="" class="list-item-score-unit">分</span></p>
    </li>
    `


    const container = document.querySelector('.scroll-list.main > ul.list')

    container.querySelectorAll('.list-item').forEach(e => e.remove())

    function randomTime() {
        return ~~(Math.random() * 60 * 10 * 1000)
    }
    function* timeGenerator(init) {
        let timestamp = new Date(`2000-01-01 ${init}:00`).getTime()
        let last = timestamp
        while (1) {
            let date = new Date(last + randomTime())
            last = date.getTime()
            yield `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        }
    }


    let demoList = [
        { time: '', desc: '文章时长' },
        { time: '', desc: '阅读文章' },
        { time: '', desc: '登录' },
    ]
    let gen = timeGenerator('10:00')
    Array.from([
        ...Array.from({ length: 10 }).map(e => demoList[(Math.random() > 0.5) ? 1 : 0]),
        demoList[2]
    ]).map(({ desc = 'desc', score = 1 }, idx) => {
        const { value: time } = gen.next()
        container.innerHTML += itemRender({ time, desc, score })
    })

    try {
        document.querySelector('#__pageSpy').style.display = 'none'
    } catch (err) { }
})()
```
