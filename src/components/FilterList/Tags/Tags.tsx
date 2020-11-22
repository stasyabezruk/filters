import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RadioBtn } from "src/components/UI";
import { RootState } from "src/app/store";

type Props = {
    selectedVal: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Tags: React.FC<Props> = ({
    selectedVal,
    handleChange
}) => {
    const tags: string[] = useSelector((state: RootState) => state.sdk.tags);

    return (
        <div className="tags-list">
            {tags.map((item: string) => {
                return (
                    <RadioBtn
                        key={item}
                        id={item}
                        name={item}
                        selectedVal={selectedVal}
                        onChange={handleChange}
                    >
                        {item}
                    </RadioBtn>
                )
            })}
        </div>
    )
}

export default Tags;