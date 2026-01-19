import { ContentContainer } from "@/components/main/ContentContainer";
import { SearchContainer } from "@/components/main/SearchContainer";

export function MainContent() {

    return (
        <div className="flex items-center flex-col gap-8 lg:w-[1216px]">
            <SearchContainer />
            <ContentContainer />
        </div>
    )
}