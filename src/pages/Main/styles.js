import styled from 'styled-components/native';
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const DataEmpty = styled.Text`
  font-size: 16px;
  color: #bbb;
  font-weight: bold;
  text-align: center;
`;

export const Form = styled.View`
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

export const FieldsForm = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs({ placeholderTextColor: '#999' })`
  flex: 1;
  height: 40px;
  background: #ddd;
  border-radius: 4px;
  padding: 0 15px;
  border: ${props => props.erro ? '1px solid #c43535' : '1px solid #ddd'};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  margin-left: 10px;
  padding: 0 12px;
  height: 40px;
  border-radius: 4px;
  opacity: ${ props => props.loading ? 0.7 : 1};
`;

export const Erro = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: #c43535;
  text-align: center;
`;

export const List = styled.FlatList.attrs({ showsVerticalScrollIndicator: false })`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #EEE;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({ numberOfLines: 2 })`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ContainerActions = styled.View`
   flex-direction: row;
`;

export const ProfileButton = styled(RectButton)`
  flex: 1;
  margin: 10px;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const DeleteButton = styled(RectButton)`
  margin-top: 10px;
  padding: 0 5px;
  background: transparent;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
