import {View, Text, Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import LGBackround from 'components/blocks/LGBackround/LGBackround';

type ComponentProps = {
    children: React.ReactNode;
    isModalVisible: boolean,
     toggleModal:()=>void
    
}
const ModalBottom = ({children,isModalVisible,toggleModal}:ComponentProps) => {
  return (
    <View>
      <Modal
       onBackdropPress={() => isModalVisible}
       onBackButtonPress={() => isModalVisible}
       isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={()=>toggleModal()}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={100}
        animationOutTiming={200}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={100}
        style={styles.modal}
     >
         <ScrollView>

       
     
        <LGBackround>
        <View>
              <ScrollView>
                
                <View style={styles.modalContent}>
                <View style={styles.barIcon} />
                    
{children}
                </View>
                </ScrollView>
                </View>
        </LGBackround>
        </ScrollView>
       
      </Modal>
    </View>
  );
};

const styles=StyleSheet.create({
  modalContent: {
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 0,
  
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom:20
  },
  modal:{
   margin:0,
   minHeight:200,
  }
})

export default ModalBottom;
