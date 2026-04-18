import React from 'react';
import styled from 'styled-components';
import ConversationContext from '../context/ConversationContext';
import './CharacterAnimation.css';

const Card = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 20px;
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  }
  
  &.selected {
    border: 3px solid #667eea;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid rgba(102, 126, 234, 0.3);
    animation: pulse 3s ease-in-out infinite;
  }
`;

const Name = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Age = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid rgba(102, 126, 234, 0.3);
`;

const Description = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const LanguageBadge = styled.span`
  background: rgba(118, 75, 162, 0.2);
  color: #764ba2;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid rgba(118, 75, 162, 0.3);
  margin-top: auto;
`;

export default function CharacterCard({ character, isSelected, onClick }) {
  return (
    <ConversationContext.Consumer>
      {({ selectedCharacter }) => (
        <Card className={isSelected ? 'selected' : ''} onClick={() => onClick(character)}>
          <Avatar>{character.emoji || '👤'}</Avatar>
          <Name>{character.name}</Name>
          <Age>{character.age}</Age>
          <Tags>
            {character.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
          <Description>{character.description}</Description>
          <LanguageBadge>{character.language}</LanguageBadge>
        </Card>
      )}
    </ConversationContext.Consumer>
  );
}
