export const Appbar = ({user}) => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex items-center">
            {user && (
                <div className="mr-4">
                    Hello, {user.firstname} 🙏
                </div>
            )}
        </div>
    </div>
}