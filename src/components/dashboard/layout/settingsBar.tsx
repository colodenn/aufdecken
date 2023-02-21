import { Cross1Icon } from "@radix-ui/react-icons";
import { useSettingsbarStore } from "../../../stores/settingsBar";

const SettingsBar = () => {
    const { settingsBarOpen, toggleSettingsBar } = useSettingsbarStore();
    return (
        <>
            {
                settingsBarOpen && (

                    <div className="w-96 absolute right-0 bg-white border-l-[1px] p-4" style={{ height: "calc(100% - 69px)" }}>
                        <div className="relative w-full h-full">
                            <button className="absolute left-0 top-0" onClick={() => toggleSettingsBar(false)}>
                                <Cross1Icon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default SettingsBar;