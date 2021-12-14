import React from "react";
import moment from "moment";

// Styled Components
import { Small } from "../styled-components/Text.styled";
import { FlexContainer, ModalContainer } from "../styled-components/Default.styled";
import {
	FormRadio,
	FormLabel,
	FormInput,
	FormSelect,
	FormButton,
	TransTypeContainer,
	TransInputContainer,
} from "./Forms.styled";

function Form(props) {
	const {
		accounts,
		categories,
		errorMsgs,
		values,
		mode,
		handleSubmit,
		cancelSubmit,
		handleValueChange,
		handleDeleteTransaction,
		blockInvalidCharacter,
	} = props;

	return (
		<ModalContainer>
			<Small>{mode === "add" ? "Add" : "Edit"} Transaction</Small>

			<form onSubmit={handleSubmit}>
				{/* Select transaction type */}
				<TransTypeContainer>
					<FormRadio
						type="radio"
						name="transactionType"
						value="income"
						id="income"
						checked={values.transactionType === "income"}
						onChange={handleValueChange}
					/>

					<FormLabel htmlFor="income">
						<p>Income</p>
					</FormLabel>

					<FormRadio
						type="radio"
						name="transactionType"
						value="expense"
						id="expense"
						checked={values.transactionType === "expense"}
						onChange={handleValueChange}
					/>

					<FormLabel htmlFor="expense">
						<p>Expense</p>
					</FormLabel>

					<FormRadio
						type="radio"
						name="transactionType"
						value="transfer"
						id="transfer"
						checked={values.transactionType === "transfer"}
						onChange={handleValueChange}
					/>

					<FormLabel htmlFor="transfer">
						<p>Transfer</p>
					</FormLabel>
				</TransTypeContainer>

				<TransInputContainer>
					{/* Transaction information */}
					<FlexContainer justifySmall="space-between">
						<p htmlFor="transactionDate" as="label">
							Date
						</p>
						<FormInput
							type="date"
							name="transactionDate"
							id="transactionDate"
							onChange={handleValueChange}
							value={moment(values.transactionDate).format("YYYY-MM-DD")}
						/>
					</FlexContainer>

					{/* For Income and Expense transaction types */}
					{values.transactionType !== "transfer" && (
						<>
							<FlexContainer justifySmall="space-between">
								<p htmlFor="fromAccount" as="label">
									Account
								</p>
								<div>
									<FormSelect
										value={values.fromAccount}
										onChange={handleValueChange}
										name="fromAccount"
										id="fromAccount"
									>
										<option value="" disabled>
											-- Select one --
										</option>
										{accounts.map((item, key) => {
											return (
												<option value={item} key={key}>
													{item}
												</option>
											);
										})}
									</FormSelect>
									<Small type = "error">{errorMsgs.fromAccount}</Small>
								</div>
							</FlexContainer>

							<FlexContainer justifySmall="space-between">
								<p htmlFor="transactionCategory" as="label">
									Category
								</p>

								<div>
									<FormSelect
										value={values.transactionCategory}
										onChange={handleValueChange}
										id="transactionCategory"
										name="transactionCategory"
									>
										<option value="" disabled>
											-- Select one --
										</option>
										{categories[values.transactionType].map((item, key) => {
											return (
												<option value={item} key={key}>
													{item}
												</option>
											);
										})}
									</FormSelect>
									<Small type = "error">
										{errorMsgs.transactionCategory}
									</Small>
								</div>
							</FlexContainer>
						</>
					)}

					{/* For transfer transaction type */}
					{values.transactionType === "transfer" && (
						<>
							<FlexContainer justifySmall="space-between">
								<p htmlFor="fromAccount" as="label">
									From
								</p>
								<div>
									<FormSelect
										value={values.fromAccount}
										onChange={handleValueChange}
										name="fromAccount"
										id="fromAccount"
									>
										<option value="" disabled>
											-- Select one --
										</option>
										{accounts.map((item, key) => {
											return (
												<option value={item} key={key}>
													{item}
												</option>
											);
										})}
									</FormSelect>
									<Small type = "error">{errorMsgs.fromAccount}</Small>
								</div>
							</FlexContainer>

							<FlexContainer justifySmall="space-between">
								<p htmlFor="toAccount" as="label">
									To
								</p>
								<div>
									<FormSelect
										value={values.toAccount}
										onChange={handleValueChange}
										name="toAccount"
										id="toAccount"
									>
										<option value="" disabled>
											-- Select one --
										</option>
										{accounts.map((item, key) => {
											return (
												<option value={item} key={key}>
													{item}
												</option>
											);
										})}
									</FormSelect>
									<Small type = "error">{errorMsgs.toAccount}</Small>
								</div>
							</FlexContainer>
						</>
					)}

					<FlexContainer justifySmall="space-between">
						<p htmlFor="transactionAmount" as="label">
							Amount
						</p>
						<div>
							<FormInput
								type="number"
								name="transactionAmount"
								id="transactionAmount"
								onChange={handleValueChange}
								value={values.transactionAmount ? Math.abs(values.transactionAmount) : ""}
								min="0"
								placeholder="0"
								onKeyDown={blockInvalidCharacter}
								step = "0.01"
							/>
							<Small type = "error">{errorMsgs.transactionAmount}</Small>
						</div>
					</FlexContainer>

					<FlexContainer justifySmall="space-between">
						<p htmlFor="transactionNotes" as="label">
							Notes
						</p>
						<FormInput
							type="text"
							name="transactionNotes"
							id="transactionNotes"
							value={values.transactionNotes}
							onChange={handleValueChange}
						/>
					</FlexContainer>
				</TransInputContainer>

				<TransInputContainer>
					<FlexContainer>
						<FormButton type="submit" value="save">
							Save
						</FormButton>
						{mode === "edit" && (
							<FormButton
								type="button"
								onClick={handleDeleteTransaction}
								value="delete"
							>
								Delete
							</FormButton>
						)}
						<FormButton type="button" onClick={cancelSubmit}>
							Cancel
						</FormButton>
					</FlexContainer>
				</TransInputContainer>
			</form>
		</ModalContainer>
	);
}

export default Form;