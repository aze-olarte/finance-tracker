import React from "react";
import { totalValueFormat, singleValueFormat } from "../../helpers/calc";
import {
    ScrollingContainer,
    LargeNumberContainer,
    FlexContainer,
    Dot,
    AccountContainer,
    AccountTotalContainer,
} from "../styled-components/Containers.styled";
import { Subtitle, Small, Bold } from "../styled-components/Text.styled";

function SidebarAccounts(props) {
    const { accountsInfo, getAccounts, initialState } = props;

    return (
        <ScrollingContainer>
            <AccountTotalContainer>
                <FlexContainer justifySmall='space-between'>
                        <Bold type = "income">Total Assets</Bold>
                        <Bold type = "income">{totalValueFormat(accountsInfo.totalAssets)}</Bold>
                </FlexContainer>
                <FlexContainer justifySmall = "space-between">            
                        <Bold type = "expense">Total Liabilities</Bold>
                        <Bold type = "expense">{totalValueFormat(accountsInfo.totalLiabilities)}</Bold>
                </FlexContainer>
            </AccountTotalContainer>
            {(accountsInfo !== initialState ? accountsInfo : getAccounts()).items.map((item, key) => {
                return (
                    <AccountContainer key={key}>
                        <FlexContainer>
                            <Dot color={item.value} />
                            <Bold>{item.accountName}</Bold>
                        </FlexContainer>
                        <p>{singleValueFormat(item.value, true)}</p>
                    </AccountContainer>
                );
            })}
        </ScrollingContainer>
    );
}

export default SidebarAccounts;
