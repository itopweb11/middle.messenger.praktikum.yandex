document.querySelector<HTMLDivElement>('#app')!.innerHTML = Main()

export function Main() {
    return (
        `<main class="main">
            <div class="main__block">
               <a href="/authorization">Авторизация</a>
               <a href="/registration">Регистрация</a>
               <a href="/profile">Профиль</a>
               <a href="/chat">Чат</a>
               <a href="/404">404</a>
               <a href="/500">500</a>
            </div>
        </main>`
    )
}
