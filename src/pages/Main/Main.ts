document.querySelector<HTMLDivElement>('#app')!.innerHTML = Main()

export function Main() {
    return (
        `<main class="main">
            <nav class="main__block">
                <ul class="main__block__list">
                    <li><a href="/authorization">Авторизация</a></li>
                    <li><a href="/registration">Регистрация</a></li>
                    <li><a href="/profile">Профиль</a></li>
                    <li><a href="/chat">Чат</a></li>
                    <li><a href="/404">404</a></li>
                    <li><a href="/500">500</a></li>
                </ul>
            </nav>
        </main>`
    )
}
