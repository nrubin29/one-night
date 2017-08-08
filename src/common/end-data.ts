import CardHolder from './card-holder';

interface EndData {
  player: CardHolder;
  killed: boolean;
  votedBy: CardHolder[];
}

export default EndData;
