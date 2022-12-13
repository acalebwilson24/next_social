import Button from "./Button";
import Image from 'next/image'
import { ClientUser } from "types/entityTypes";
import { FCWithChildren } from "types/layoutTypes";

const PostWrapper: React.FC<{ user: ClientUser, deletePost?: () => void } & FCWithChildren> = ({ user, children, deletePost }) => (
    <div className="border-b border-slate-300 py-4 px-4 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-300 mr-2">
            {user.image && <Image src={user.image} alt="avatar" className="w-full h-full rounded-full" width={150} height={150} />}
        </div>
        <div className="flex-1">
            <p className="font-bold">{user.name}</p>
            {children}
            <div className="flex justify-end gap-2 pt-4">
                <Button className="">Like</Button>
                <Button className="">Reply</Button>
                <Button className="text-white-500 hover:text-slate-600" buttonType="danger" onClick={() => deletePost && deletePost()}>Delete</Button>
            </div>
        </div>
    </div>
)

export default PostWrapper;