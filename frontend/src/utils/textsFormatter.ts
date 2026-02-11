export function formatFullUserNameToAvatar(fullUserName: string | undefined): string {
    if (!fullUserName) {
        return ""
    }

    const names = fullUserName.split(" ");

    const firstLetters = names.map((name) => {
        return name.charAt(0)
    })

    return firstLetters.join('')
}