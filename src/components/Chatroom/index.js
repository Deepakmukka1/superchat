/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Navbar from '../Navbar'
import { getFirestore, collection} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const Chatroom = ({auth,app}) => {
    // console.log(auth)
    const {currentUser}=auth
    const [messages, loading, error] = useCollection(
        collection(getFirestore(app), 'messages'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

    return (
        <div>
            <Navbar name={currentUser.displayName} imageURL={currentUser.photoURL} auth={auth}/>
            <h3>Chatroom</h3>
            <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {messages && (
          <span>
            {messages.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <p>{doc.data().message}</p>
              </React.Fragment>
            ))}
          </span>
        )}
      </p>

        </div>
    )
}

export default Chatroom
