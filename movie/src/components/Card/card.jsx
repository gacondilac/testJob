import { DivCard, DivContainer, DivContainerImg, DivInfo } from "./styleCard";

export default function Card({ Information }) {
  return (
    <>
      <DivContainer>
        {Information.map((lanch) => (
          <DivCard key={lanch.id}>
            <DivInfo>
              <h3>{lanch.name}</h3>
            </DivInfo>
            <DivContainerImg>
              {/* <img src={lanch.img} alt="imagem" /> */}
            </DivContainerImg>
            <DivInfo>
              <p>{lanch.numLike} Like</p>
              <button>Like</button>
            </DivInfo>
          </DivCard>
        ))}
      </DivContainer>
    </>
  );
}
