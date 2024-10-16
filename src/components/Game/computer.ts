export const calculateMove = () => {
  const moves = [0, 1, 2]; // 0 = rock, 1 = paper, 2 = scissors
  return moves[Math.floor(Math.random() * moves.length)];
};

export const returnMoveAsName = (choice: number) => {
  const moves = ['Rock', 'Paper', 'Scissors'];
  return moves[choice];
};
