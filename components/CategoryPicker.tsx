import DropDownPicker from "react-native-dropdown-picker";
import { useState, SetStateAction, Dispatch } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
// import DeleteCategoryDialog from './DeleteCategoryDialog';
import CreateCategoryDialog from "./CreateCategoryDialog";
import { createCategoryRequest } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";

const styles = StyleSheet.create({
  green: {
    color: "green",
    fontSize: 19,
  },
  red: {
    color: "red",
    fontSize: 19,
  },
});

interface CategoryPickerProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  categories: { label: string; value: string }[];
  setCategories: Dispatch<SetStateAction<{ label: string; value: string }[]>>;
}
interface CategoryCreationProps {
  visible: boolean;
  hideDialog: () => void;
  createCategory: (username: string, value: string) => boolean | Promise<true>; //
  errorStates: {
    errorText: string;
    setErrorText: (text: string) => void;
  };
}
export default function CategoryPicker({
  category,
  setCategory,
  categories,
  setCategories,
}: CategoryPickerProps) {
  const [errorText, setErrorText] = useState("");
  const errorStates = { errorText, setErrorText };
  const [selectOpen, setSelectOpen] = useState(false);
  // const [deleteVisible, setDeleteVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false);
  const { currentUser } = useUserContext();

  // const closeDelete = () => {setDeleteVisible(false)}
  // const deletePressed = () => {setDeleteVisible(true)}

  const closeCreate = () => {
    setCreateVisible(false);
  };
  const createPressed = () => {
    setCreateVisible(true);
  };

  // function deleteCategory() {
  //     // do API stuff here
  //     setCategories(categories.filter((categoryObj => categoryObj.value !== category)))
  //     setCategory("")
  // }

  function createCategory(newCategory: string) {
    if (newCategory.trim().length < 3) {
      setErrorText("Name too short");
      return false;
    }
    newCategory = newCategory.trim();

    createCategoryRequest(newCategory, currentUser)
      .then((response: any) => {
        if (response.status === 201) {
          setCategories((currState) => {
            currState.push({ label: newCategory, value: newCategory });
            return currState;
          });
          setCategory(newCategory);
        } else {
          console.error("Failed to create category");
          setErrorText("Failed to create category");
        }
      })
      .catch((error: any) => {
        console.error("Error creating category:", error);
        setErrorText("Failed to create category");
      });

    return true;
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          maxWidth: "80%",
          minWidth: "80%",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ maxWidth: "70%" }}>
          <DropDownPicker
            open={selectOpen}
            setOpen={setSelectOpen}
            value={category}
            setValue={setCategory}
            items={categories}
            setItems={setCategories}
          />
        </View>
        {/* {
                    category === "" ?  */}
        <Button
          mode="elevated"
          onPress={createPressed}
          labelStyle={styles.green}
          style={{ justifyContent: "center" }}
        >
          +
        </Button>
        {/* :
                        <Button mode="elevated" onPress={deletePressed} 
                            labelStyle={styles.red} 
                            style={{justifyContent: "center"}}
                        >-</Button> */}
        {/* } */}
      </View>
      {/* <DeleteCategoryDialog visible={deleteVisible} hideDialog={closeDelete} deleteCategory={deleteCategory}/> */}
      <CreateCategoryDialog
        visible={createVisible}
        hideDialog={closeCreate}
        createCategory={createCategory}
        errorStates={errorStates}
      />
    </>
  );
}
