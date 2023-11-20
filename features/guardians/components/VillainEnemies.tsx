import {CharacterEnemies} from '../types/Villain'
import CardFriend from "./CardFriend";

export default function HeroFriends({ characterEnemies }: { characterEnemies: CharacterEnemies | undefined }) {

  return (
    // < !--component -- >
    <div className=" flex items-center justify-center">

      <div className="grid grid-cols-12 max-w-5xl gap-4">

        

        {characterEnemies!== undefined && Object.keys(characterEnemies!).map((key) => (
          <CardFriend friend={characterEnemies[key]}/>
        ))}



      </div>

    </div>
  )
}