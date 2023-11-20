import { CharacterFriends } from "../types/Hero";
import CardFriend from "./CardFriend";

export default function HeroFriends({ characterFriends }: { characterFriends: CharacterFriends | undefined }) {

  return (
    // < !--component -- >
    <div className=" flex items-center justify-center">

      <div className="grid grid-cols-12 max-w-5xl gap-4">

        

        {characterFriends!== undefined && Object.keys(characterFriends!).map((key) => (
          <CardFriend friend={characterFriends[key]}/>
        ))}



      </div>

    </div>
  )
}