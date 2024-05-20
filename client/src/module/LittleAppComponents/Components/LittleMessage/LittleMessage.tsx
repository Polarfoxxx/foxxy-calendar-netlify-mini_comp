import { connect } from "react-redux";
import { Type_RootState } from "../../../../redux";
import { Type_for_LittleMessage } from "./types";


function LittleMessage({ allMessages }: Type_for_LittleMessage): JSX.Element {


    
    return (
        <div className=" w-[100%] h-[100%] flex items-center justify-center flex-row bg-thems-littleComponent_Background">
            <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">
                <div className=" w-full h-auto flex items-center justify-center">
                    <h1 className=" text-[35px]">
                        YOU MESSAGE
                    </h1>
                </div>
                <div className="w-[200px] h-auto flex items-center justify-start gap-3">
                    <div>
                        <h3>
                            Your valid tasks:
                        </h3>
                    </div>
                    <div>
                        <h1>
                            {allMessages.filter(item => item.status === true).length}
                        </h1>
                    </div>
                </div>
                <div className=" w-[200px] h-auto flex items-center justify-start gap-3">
                    <div>
                        <h3>
                            Your invalid tasks:
                        </h3>
                    </div>
                    <div>
                        {allMessages.filter(item => item.status === false).length}
                    </div>
                </div>
            </div>
            <div className="w-[100%] h-[100%] flex items-center justify-center ">
                <div className="w-[80%] h-[80%]">
                    <img
                    className=" w-full h-full"
                    src="/image/task-list.png" alt="taskLogo" />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: Type_RootState) => ({
    allMessages: state.allMessages,
});

export default connect(mapStateToProps)(LittleMessage);


