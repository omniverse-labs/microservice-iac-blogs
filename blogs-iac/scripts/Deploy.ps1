[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$subscriptionId,
    [Parameter(Mandatory = $true)]
    [string]$resourceGroupName,
    [Parameter(Mandatory = $true)]
    [string]$location,
    [Parameter(Mandatory = $true)]
    [string]$templateFilePath,
    [Parameter(Mandatory = $true)]
    [string]$parametersFilePath
)

if (-not (Test-Path $templateFilePath)) {
    Write-Error "Template file not found!"
}

if (-not (Test-Path $parametersFilePath)) {
    Write-Error "Parameters file not found!"
}

# create the resource group
Set-AzContext -Subscription $subscriptionId
New-AzResourceGroup -Name $resourceGroupName -Location $location

# create the resources
New-AzResourceGroupDeployment `
    -ResourceGroupName $resourceGroupName `
    -TemplateFile $templateFilePath `
    -TemplateParameterFile $parametersFilePath `

Write-Information "Deployment Completed!"